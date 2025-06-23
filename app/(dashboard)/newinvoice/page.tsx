'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FaCalendar } from "react-icons/fa";
import { useState } from "react";
import CustomFormInput from "./CutomFormInput";
import DescriptionRow from "./DescriptionRow";
import HoverAction from "@/components/HoverAction";

export default function NewInvoice() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>();


  const [numberOfDescriptionRows, setNumberOfDescriptionRows] = useState<number[]>([0]);



  return (
    <div className="">
      <label htmlFor="invoice-number" className="text-lg playfair">Invoice No.</label>
      <div className="flex border w-fit rounded-lg">
        <span className="p-2 border-r bg-white/20 "> # </span>
        <input type="number" className="p-1 outline-none"  placeholder="5"/>
      </div>


      <form 
        onSubmit={() => console.log('submited')}
        className="mt-5"
      >
        <section className="flex flex-col md:flex-row gap-5 w-full lg:w-3/4">
          <div className="w-full">
            <h2 className="playfair">From :</h2>
            <div className="flex flex-col gap-5">
              <CustomFormInput placeholder="Your Name " name="your-name"/>
              <CustomFormInput placeholder="Your Email" name="your-email"/>
              <CustomFormInput placeholder="Your Address"/>
            </div>
          </div>
          
          <div className="w-full">
            <h2 className="playfair">To :</h2>
            <div className="flex flex-col gap-5">
              <CustomFormInput placeholder="Client Name" name="client-name"/>
              <CustomFormInput placeholder="Client Email" name="client-email"/>
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
            <label className="playfair">Due Date :</label>
            <Popover>
              <PopoverTrigger className="flex items-center border rounded-lg">
                <span className="p-2 border-r bg-white/20"><FaCalendar/></span> 
                <span className="p-1">
                  {selectedDueDate ? new Intl.DateTimeFormat("en-US", { dateStyle: "long"} ).format(selectedDate) : 'Select a Date'}
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
                {numberOfDescriptionRows.map((rowId, i) => (
                    <DescriptionRow 
                      key={rowId}
                      index={i}
                      numberOfDescriptionRows={numberOfDescriptionRows}
                      onClick={() => setNumberOfDescriptionRows(perv => {
                        const filter = perv.filter(id => id !== rowId)

                        return filter;
                      })}
                    />
                  ))
                }
              </div>
          </div>

          <button
            type="button"
            onClick={() => setNumberOfDescriptionRows(prev => [...prev, prev[prev.length - 1] + 1])}
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
              <span>$ 100</span>
            </div>
          
            
            <div className="flex items-center justify-between w-full text-xl border-t">
              <span className="playfair"> Total</span>
              <span>$ 100 USD</span>
            </div>
          </div>
        </section>

        <HoverAction type="submit"  className="mt-10 cursor-pointer">
          Submit to Client 
        </HoverAction>
      </form>
    </div>
  );
}
