'use client'

import AnimateBorderBottomComponent from "@/components/AnimateBorderBottomComponent";
import HoverAction from "@/components/HoverAction";
import TogglePasswordInput from "@/components/TogglePasswordInput";
import Link from "next/link";
import { signup } from "../actions/signup";
import { FormEvent, useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function SignUpForm(){
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true)

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    setErrorMsg(result.error);
    setIsLoading(false);
  }

  const resetError = () => {
    if(errorMsg.length > 0){
      setErrorMsg('')
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="text-white"
    >
      <div className="flex flex-col mb-3 gap-2">
        <label htmlFor="name" className="text-xl playfair">Name:</label>
        <AnimateBorderBottomComponent>
          <input 
            type="text" 
            name="name" 
            id="name"
            placeholder="Enter your Name . . ."
            onChange={resetError}
            className="outline-none py-1"
          />
        </AnimateBorderBottomComponent>
      </div>

      <div className="flex flex-col mb-3 gap-2">
        <label htmlFor="email" className="text-xl playfair">Email:</label>
        <AnimateBorderBottomComponent>
          <input 
            type="text" 
            name="email" 
            id="email"
            placeholder="Enter your Email . . ."
            onChange={resetError}
            className="outline-none py-1"
          />
        </AnimateBorderBottomComponent>
      </div>
    
      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="password" className="text-xl playfair">Password:</label>
        <TogglePasswordInput placeholder="Enter Your Password . . ." id="password"  onChange={resetError}/>
      </div>
      
      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="confirm-password" className="text-xl playfair">Confirm Password:</label>
        <TogglePasswordInput placeholder="Confirm Password . . ." id="confirm-password"  name="confirm-password" onChange={resetError}/>
      </div>

      <div className="flex items-center gap-5 mb-3">
        <HoverAction type="submit" className="playfair border py-1 px-4 rounded-lg cursor-pointer">
          Sign Up
        </HoverAction>
        {isLoading && <CgSpinnerTwoAlt className="animate-spin"/>}
        {errorMsg.length > 0 &&  <p className="text-red-500 font-bold">{errorMsg}*</p>}
      </div>

      <div className="flex justify-start items-center">
        <Link href="?mode=signin" className="hover:text-gray-300 hover:underline text-white text-sm block">
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}