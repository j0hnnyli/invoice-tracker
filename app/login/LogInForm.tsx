'use client'

import AnimateBorderBottomComponent from "@/components/AnimateBorderBottomComponent";
import HoverAction from "@/components/HoverAction";
import TogglePasswordInput from "@/components/TogglePasswordInput";
import Link from "next/link";
import { login } from "../actions/login";
import { FormEvent, useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import ResetDialog from "./ResetDialog";


export default function LoginForm(){
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    setIsLoading(false);
    setErrorMsg(result.error)
  }

   const resetError = () => {
    if(errorMsg.length > 0){
      setErrorMsg('')
    }
  }

  return (
    <>
      <form 
        onSubmit={(e) => handleSignIn(e)}
        className="text-white"
      >
        <div className="flex flex-col mb-3 gap-2">
          <label htmlFor="email" className="text-xl playfair">Email:</label>
          <AnimateBorderBottomComponent>
            <input 
              type="text" 
              name="email" 
              id="email"
              placeholder="Enter your Email . . ."
              onChange={resetError}
              className="outline-none py-1 w-full"
            />
          </AnimateBorderBottomComponent>
        </div>
      
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="password" className="text-xl playfair">Password:</label>
          <TogglePasswordInput 
            placeholder="Enter Your Password . . ." 
            id="password" 
            onChange={resetError}
          />
        </div>

        <div className="flex items-center gap-5 mb-3">
          <HoverAction type="submit" className="playfair border py-1 px-4 rounded-lg cursor-pointer">
            Log In
          </HoverAction>
          {isLoading && <CgSpinnerTwoAlt className="animate-spin"/>}
          {errorMsg.length > 0 &&  <p className="text-red-500 font-bold">{errorMsg}*</p>}
        </div>
      </form>
      
      <p className="text-sm text-white">
        Don&apos;t have an account?{" "}
        <Link href="?mode=signup" className="hover:text-gray-300 hover:underline">
          Sign Up
        </Link>
      </p>
      
      <p className="text-sm text-white">
        Forgot Password? {" "}
        <ResetDialog />
      </p>
    </>
  )
}