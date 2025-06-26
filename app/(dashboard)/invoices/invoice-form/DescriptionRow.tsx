import { FaRegTrashAlt } from "react-icons/fa";
import CustomFormInput from "./CutomFormInput";
import { twMerge } from "tailwind-merge";

type DescriptionRowProps = {
  index: number;
  totalRows: number;
  quantity: string;
  rate: string;
  description : string;
  amount: string;
  onClick: () => void;
  onChange: (
    index: number,
    field: "quantity" | "rate" | "amount" | "description",
    value: string
  ) => void;
};

export default function DescriptionRow({
  index,
  description,
  quantity,
  rate,
  amount,
  onClick,
  onChange,
  totalRows,
}: DescriptionRowProps) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 py-2",
        index === totalRows - 1 ? "border-b-none" : "border-b"
      )}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor={`description-${index}`} className="playfair">
          Description *
        </label>
        <textarea
          id={`description-${index}`}
          name={`description[${index}]`}
          rows={2}
          value={description}
          onChange={(e) => onChange(index, "description", e.target.value)}
          placeholder="Item / Service Description"
          className="outline-none"
        />
      </div>

      <div className="grid grid-cols-4 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor={`quantity-${index}`} className="playfair">
            Quantity
          </label>
          <CustomFormInput
            type="number"
            id={`quantity-${index}`}
            name={`quantity[${index}]`}
            value={quantity}
            onChange={(e) => onChange(index, "quantity", e.target.value)}
            className="border-none"
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`rate-${index}`} className="playfair">
            Rate
          </label>
          <CustomFormInput
            type="number"
            id={`rate-${index}`}
            name={`rate[${index}]`}
            value={rate}
            onChange={(e) => onChange(index, "rate", e.target.value)}
            className="border-none"
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`amount-${index}`} className="playfair">
            Amount *
          </label>
          <CustomFormInput
            type="number"
            id={`amount-${index}`}
            name={`amount[${index}]`}
            value={amount}
            onChange={(e) => onChange(index, "amount", e.target.value)}
            className="border-none"
            placeholder="0"
          />
        </div>
        {index > 0 ? (
          <button
            type="button"
            onClick={onClick}
            className="hover:text-red-800 text-red-500 cursor-pointer"
          >
            <FaRegTrashAlt className="" />
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
