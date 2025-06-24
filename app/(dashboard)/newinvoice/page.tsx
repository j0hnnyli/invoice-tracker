'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FaCalendar } from "react-icons/fa";
import { FormEvent, useState } from "react";
import CustomFormInput from "./CutomFormInput";
import DescriptionRow from "./DescriptionRow";
import HoverAction from "@/components/HoverAction";
import { createInvoice } from "@/app/actions/createInvoice";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from "sonner";

export default function NewInvoice() {
  const [ selectedDate, setSelectedDate ] = useState<Date>(new Date());
  const [ selectedDueDate, setSelectedDueDate ] = useState<Date | undefined>();

  const [ errorMsg, setErrorMsg ] = useState<string>("");
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const [rows, setRows] = useState([{ quantity: "", rate: "", amount: "0" }]);

  function handleRowChange(index: number, field: "quantity" | "rate" | "amount", value: string) {
    setRows((prev) => {
      const updated = [...prev];
      const row = { ...updated[index], [field]: value };

      if (field === "quantity" || field === "rate") {
        const qty = parseInt(row.quantity || "0");
        const rt = parseInt(row.rate || "0");

        if (!isNaN(qty) && !isNaN(rt) && (row.quantity || row.rate)) {
          row.amount = (qty * rt).toFixed(2);
        }else{
          row.amount = ""
        }
      }

      updated[index] = row;
      return updated;
    });
  }

  function addRow() {
    setRows((prev) => [...prev, { quantity: "", rate: "", amount: "0" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  const subtotal = rows.reduce((sum, row) => {
    const amount = parseFloat(row.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0).toFixed(2);

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    formData.append('created-at', selectedDate.toISOString())
    formData.append('due-date', selectedDueDate?.toISOString() || "");

    setIsLoading(true);

    const result = await createInvoice(formData);

    setIsLoading(false);

    if(result){ 
      setErrorMsg(result?.error)
    }else{
      toast.success("Invoice Sent", {
        description : "Your Invoice was Sent to The Client"
      })
    }
  }


  return (
    <>
      {}
      <form 
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label htmlFor="invoice-number" className="text-lg playfair">Invoice No. *</label>
          <div className="flex border w-fit rounded-lg">
            <span className="p-2 border-r bg-white/20 "> # </span>
            <input type="number" name="invoice-number" className="p-1 outline-none"  placeholder="5"/>
          </div>
        </div>

        <section className="flex flex-col md:flex-row gap-5 w-full lg:w-3/4 mt-5">
          <div className="w-full">
            <h2 className="playfair">From :</h2>
            <div className="flex flex-col gap-5">
              <CustomFormInput placeholder="Your Name *" name="name"/>
              <CustomFormInput placeholder="Your Email *" name="email"/>
              <CustomFormInput placeholder="Your Address"/>
            </div>
          </div>
          
          <div className="w-full">
            <h2 className="playfair">To :</h2>
            <div className="flex flex-col gap-5">
              <CustomFormInput placeholder="Client Name *" name="client-name"/>
              <CustomFormInput placeholder="Client Email *" name="client-email"/>
              <CustomFormInput placeholder="Client Address"/>
            </div>
          </div>
        </section>

        <section className="mt-5 flex flex-col md:flex-row gap-5 lg:w-3/4">
          <div className="flex flex-col w-full">
            <label className="playfair">Date :</label>
            <Popover>
              <PopoverTrigger className="flex items-center border rounded-lg">
                <span className="p-2 border-r bg-white/20"><FaCalendar/></span> 
                <span className="p-1">
                  {selectedDate ? new Intl.DateTimeFormat("en-US", { dateStyle: "long"} ).format(selectedDate) : 'Select a Date'}
                </span>
              </PopoverTrigger>
              <PopoverContent className="bg-white/20 backdrop-blur-3xl border-white">
                <Calendar 
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  captionLayout="dropdown"
                  mode="single"
                  hidden={{ before: new Date() }}
                  className="text-white w-full"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex flex-col w-full">
            <label className="playfair">Due Date : *</label>
            <Popover>
              <PopoverTrigger className="flex items-center border rounded-lg">
                <span className="p-2 border-r bg-white/20"><FaCalendar/></span> 
                <span className="p-1">
                  {selectedDueDate ? new Intl.DateTimeFormat("en-US", { dateStyle: "long"} ).format(selectedDueDate) : 'Select a Date'}
                </span>
              </PopoverTrigger>
              <PopoverContent className="bg-white/20 backdrop-blur-3xl border-white">
                <Calendar 
                  selected={selectedDueDate}
                  onSelect={(date) => setSelectedDueDate(date)}
                  captionLayout="dropdown"
                  mode="single"
                  hidden={{ before: new Date() }}
                  className="text-white w-full"
                />
              </PopoverContent>
            </Popover>
          </div>
        </section>

        <section className="mt-5 w-full"> 
          <h2 className="text-4xl playfair">Invoice Items</h2>
          <div className="mt-5">
            <div>
                {rows.map((row, index) => (
                  <DescriptionRow 
                    key={index}
                    totalRows={rows.length}
                    index={index}
                    quantity={row.quantity}
                    rate={row.rate}
                    amount={row.amount}
                    onChange={handleRowChange}
                    onClick={() => removeRow(index)}
                  />
                ))}
              </div>
          </div>

          <button
            type="button"
            onClick={addRow}
            className="py-2 px-4 bg-white/20 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            Add Another Item
          </button>
        </section>

        <section className="mt-5 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="notes" className="playfair">Notes</label>
            <textarea 
              id="notes"
              name="notes"
              rows={2}
              placeholder="notes . . ." 
              className="outline-none" 
            />
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-5">
            <div className="flex items-center justify-between w-full text-xl">
              <span className="playfair">Subtotal</span>
              <span>$ {subtotal}</span>
            </div>
          
            
            <div className="flex items-center justify-between w-full text-xl border-t">
              <span className="playfair"> Total</span>
              <span>$ {subtotal} USD</span>
            </div>
          </div>
        </section>
        
        <div className="flex gap-5 items-center mt-10">
          <HoverAction type="submit"  className="cursor-pointer">
            Submit to Client
          </HoverAction>
          {isLoading && <CgSpinnerTwoAlt className="animate-spin"/>}
        </div>
        <p className="text-red-500 mt-5 playfair font-bold">{errorMsg}</p>
      </form>
    </>
  );
}
