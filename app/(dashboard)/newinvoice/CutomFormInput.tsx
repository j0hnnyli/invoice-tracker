import { twMerge } from "tailwind-merge";

type TextInputProps = {
  className ?: string;
  placeholder: string;
  name ?: string;
  type ?: "text" | "number";
}

export default function CustomFormInput({ className, placeholder, name, type="text" } : TextInputProps ){
  return (
    <input 
      type={type} 
      name={name}
      placeholder={placeholder}
      className={twMerge("outline-none border-b py-1 w-full", className)}
    />
  )
}