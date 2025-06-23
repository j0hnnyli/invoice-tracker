import { FaRegTrashAlt } from "react-icons/fa";
import CustomFormInput from "./CutomFormInput";
import { twMerge } from "tailwind-merge";

type DescriptionRowProps = {
  onClick : () => void;
  index : number;
  numberOfDescriptionRows : number[];
}

export default function DescriptionRow({ onClick, index, numberOfDescriptionRows } : DescriptionRowProps){
  return (
    <div className={
        twMerge("grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 py-2",  
        index === numberOfDescriptionRows.length - 1 ? "border-b-none" : "border-b" )
      }
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="playfair">Description</label>
        <textarea 
          id="description"
          name="description"
          rows={2}
          placeholder="Item / Service Description" 
          className="outline-none" 
        />
      </div>

      <div className="grid grid-cols-4 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="playfair">Quantity</label>
          <CustomFormInput type="number" name="quantity" className="border-none" placeholder="0"/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Rate" className="playfair">Rate</label>
          <CustomFormInput type="number" name="Rate" className="border-none" placeholder="0"/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Amount" className="playfair">Amount</label>
          <CustomFormInput type="number" name="Amount" className="border-none" placeholder="0"/>
        </div>
        {index > 0 ? (
          <button type="button" onClick={onClick} className="hover:text-red-800 text-red-500 cursor-pointer">
            <FaRegTrashAlt className=""/>
          </button>
        ) : <p></p>}
      </div>
    </div>
  )
}