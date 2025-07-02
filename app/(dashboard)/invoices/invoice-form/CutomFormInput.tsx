import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = {
  className?: string;
  placeholder: string;
  name?: string;
  type?: "text" | "number";
  id?: string;
  readOnly?: boolean;
  value?: string;
  inputRef? : RefObject<HTMLInputElement | null>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomFormInput({
  className,
  placeholder,
  name,
  type = "text",
  id,
  readOnly,
  value,
  onChange,
  inputRef,
}: TextInputProps) {
  return (
    <input
      ref={inputRef}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      className={twMerge("outline-none border-b py-1 w-full", className)}
    />
  );
}
