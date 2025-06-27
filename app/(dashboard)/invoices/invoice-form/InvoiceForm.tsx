"use client";

import { FormEvent, useState } from "react";
import CustomFormInput from "./CutomFormInput";
import DescriptionRow from "./DescriptionRow";
import HoverAction from "@/components/HoverAction";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from "sonner";
import FormDateSelectSection from "./FormDateSelectSection";
import FormInvoiceTotalSection from "./FormInvoiceTotalSection";
import { Database } from '@/lib/types/supabase';
import FadeInContainer from "@/components/animation-components/AnimateFadeInContiner";


export type InvoiceType = Database['public']['Tables']['invoices']['Row'];

type Row = {
  description: string;
  quantity: string;
  rate: string;
  amount: string;
};

type InvoiceFormProps = {
  initialFormValues ?: InvoiceType | null;
  submitAction : ( form : FormData ) => Promise<{error:string, success : string}>;
}

export default function InvoiceForm( { initialFormValues, submitAction } : InvoiceFormProps ) {
  //Dates Selections States
  const [selectedDate, setSelectedDate] = useState<Date>(() =>  
    initialFormValues?.created_at ? new Date(initialFormValues?.created_at) : new Date()
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>(
    () => initialFormValues?.due_date ? new Date(initialFormValues.due_date) : undefined
  );

  // Discount Value States
  const [discountValue, setDiscountValue] = useState(() => initialFormValues?.discount_value || "");
  const [discountType, setDiscountType] = useState(() => initialFormValues?.discount_type || "%");

  // Error and Loading States
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Invoice Rows State and onChanfe function
  const [rows, setRows] = useState<Row[]>(() => {
    const items = initialFormValues?.invoice_items;

    if (Array.isArray(items)) {
      return (items as Row[]).map((item) => ({
        description: item.description,
        quantity: item.quantity.toString(),
        rate: item.rate.toString(),
        amount: item.amount.toString(),
      }));
    }

    return [{ description: "", quantity: "0", rate: "0", amount: "0" }];
  });

  function handleRowChange(
    index: number,
    field: "quantity" | "rate" | "amount" | "description",
    value: string
  ) {
    setRows((prev) => {
      const updated = [...prev];
      const row = { ...updated[index], [field]: value };

      if (field === "quantity" || field === "rate") {
        const qty = parseInt(row.quantity || "0");
        const rt = parseInt(row.rate || "0");

        if (!isNaN(qty) && !isNaN(rt) && (row.quantity || row.rate)) {
          row.amount = (qty * rt).toFixed(2);
        } else {
          row.amount = "";
        }
      }

      updated[index] = row;
      return updated;
    });
  }

  function addRow() {
    setRows((prev) => [...prev, { description: "", quantity: "0", rate: "0", amount: "0" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  // Invoice Total Variables
  const subtotal = rows
    .reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0)
    .toFixed(2);

  const subtotalNumber = parseFloat(subtotal || '0');
  const discountNumber = parseFloat(discountValue || '0');

  const total =
    discountType === "$"
      ? subtotalNumber - discountNumber
      : subtotalNumber - (subtotalNumber * discountNumber) / 100;

  // Submit Form Function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("created-at", selectedDate.toISOString());
    formData.append("due-date", selectedDueDate?.toISOString() || "");
    formData.append("discount_amount", discountValue);
    formData.append("discount_type", discountType);
    formData.append("invoice_items", JSON.stringify(rows));

    if (initialFormValues?.id) {
      formData.append("invoice_id", String(initialFormValues.id));
    }

    setIsLoading(true);

    const result = await submitAction(formData);

    setIsLoading(false);

    if (result.error.length > 0 ) {
      setErrorMsg(result?.error);
      return;
    }

    if(!initialFormValues){
      form.reset();
      setDiscountValue("");
      setDiscountType("$");
      setSelectedDate(new Date());
      setErrorMsg("");
      setSelectedDueDate(undefined);
      setRows([{ description: "", quantity: "0", rate: "0", amount: "0" }]);
  
      toast.success("Invoice Sent", {
        description: "Your Invoice was Sent to The Client",
      });

      return;
    }

    toast.success("Invoice Update", {
      description: "Your Updated Invoice was Sent to The Client",
    });
    setErrorMsg("");
  };

  return (
    <form 
      onSubmit={(e) => handleSubmit(e)}
    >
      <FadeInContainer
        direction="left"
        duration={0.4}
      >
        <label htmlFor="invoice-number" className="text-lg playfair">
          Invoice No. *
        </label>
        <div className="flex border w-fit rounded-lg">
          <span className="p-2 border-r bg-white/20 "> # </span>
          <input
            type="number"
            name="invoice-number"
            defaultValue={initialFormValues?.invoice_number || ""}
            className="p-1 outline-none"
            placeholder="5"
          />
        </div>
      </FadeInContainer>

      <section className="flex flex-col md:flex-row gap-5 w-full lg:w-3/4 mt-5">
        <FadeInContainer 
          direction="left"
          duration={0.4}
          className="w-full"
        >
          <h2 className="playfair">From :</h2>
          <div className="flex flex-col gap-5">
            <CustomFormInput defaultValue={initialFormValues?.name || ""} placeholder="Your Name *" name="name" />
            <CustomFormInput defaultValue={initialFormValues?.email || ""}  placeholder="Your Email *" name="email" />
            <CustomFormInput defaultValue={initialFormValues?.address || ""} placeholder="Your Address" name="address" />
          </div>
        </FadeInContainer>

        <FadeInContainer
          direction="left"
          duration={0.4}
          delay={0.2}
          className="w-full"
        >
          <h2 className="playfair">To :</h2>
          <div className="flex flex-col gap-5">
            <CustomFormInput defaultValue={initialFormValues?.client_name || ""} placeholder="Client Name *" name="client-name" />
            <CustomFormInput
              defaultValue={initialFormValues?.client_email || ""}
              placeholder="Client Email *"
              name="client-email"
            />
            <CustomFormInput defaultValue={initialFormValues?.client_address || ""} placeholder="Client Address" name="client-address"/>
          </div>
        </FadeInContainer>
      </section>

      <FormDateSelectSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedDueDate={selectedDueDate}
        setSelectedDueDate={setSelectedDueDate}
      />

      <section className="mt-5 w-full">
        <h2 className="text-4xl playfair">Invoice Items</h2>
        <div className="mt-5">
          <div>
            {rows.map((row, index) => (
              <FadeInContainer
                key={index}
                duration={0.4}
                direction="left"
                delay={index * 0.2}
              >
                <DescriptionRow
                  totalRows={rows.length}
                  description={row.description}
                  index={index}
                  quantity={row.quantity}
                  rate={row.rate}
                  amount={row.amount}
                  onChange={handleRowChange}
                  onClick={() => removeRow(index)}
                />
              </FadeInContainer>
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

      <FormInvoiceTotalSection
        subtotal={subtotal}
        discountValue={discountValue}
        setDiscountValue={setDiscountValue}
        noteDefaultValue={initialFormValues?.note || ""}
        total={total}
        setDiscountType={setDiscountType}
      />

      <FadeInContainer 
        direction="left"
        duration={0.4}
        className="flex gap-5 items-center mt-10"
      >
        <HoverAction type="submit" className="cursor-pointer">
         {initialFormValues ? "Submit Updates" : "Submit to Client"}
        </HoverAction>
        {isLoading && <CgSpinnerTwoAlt className="animate-spin" />}
        {errorMsg && <p className="text-red-500 playfair font-bold">{errorMsg}</p>}
      </FadeInContainer>
    </form>
  );
}
