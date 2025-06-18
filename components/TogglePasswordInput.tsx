'use client'

import { useState } from "react"
import { LuEyeClosed } from "react-icons/lu";
import { IoEye } from "react-icons/io5";
import AnimateBorderBottomComponent from "./AnimateBorderBottomComponent";
import { twMerge } from "tailwind-merge";


type Props = {
  placeholder : string;
  className? : string;
  id?: string;
}

export default function TogglePasswordInput({placeholder, className, id} : Props){
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AnimateBorderBottomComponent>
      <div className="flex items-center ">
        <input 
          type={showPassword ? "text" :"password" }
          name="password" 
          id={id}
          placeholder={placeholder}
          className={twMerge("outline-none w-full py-1", className)}
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
          className="cursor-pointer text-xl"
        >
          {showPassword ? <IoEye/> : <LuEyeClosed/>}
        </button>
      </div>
    </AnimateBorderBottomComponent>
  )
}