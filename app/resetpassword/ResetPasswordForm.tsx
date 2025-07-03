'use client'

import FadeInContainer from "@/components/animation-components/AnimateFadeInContiner";
import TogglePasswordInput from "@/components/TogglePasswordInput";
import { FormEvent, useState } from "react";
import { resetPassword } from "../actions/resetpassword";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleResetPassowrdSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const {success, error} = await resetPassword(new FormData(e.currentTarget), searchParams.get('code') as string);
    if(error.length > 0 ) setErrorMsg(error) 
    if(success.length > 0 ) setSuccessMsg(success) 
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <h2 className="text-4xl font-semibold text-white playfair">
        InvoTracker
      </h2>
      <p className="text-white">Reset Your Password!</p>
      <FadeInContainer direction="left" duration={0.4} className="w-full">
        <form onSubmit={(e) => handleResetPassowrdSubmit(e)} className="text-white flex flex-col gap-5 w-full md:w-[400px] max_width p-5 mx-auto">
          <TogglePasswordInput
            placeholder="Enter Your New Password . . ." 
            id="new-password"
            name="new-password" 
          />

          <TogglePasswordInput
            placeholder="Confirm Your New Password . . ." 
            id="confirm-new-password"
            name="confirm-new-password" 
          />

          <button
            type="submit"
            className="bg-white/20 text-white py-2 hover:bg-white/10 cursor-pointer flex items-center justify-center"
          >
           {isLoading ? <CgSpinnerTwoAlt className="animate-spin"/> :  "Reset Password"}
          </button>
          {errorMsg.length > 0 && <p className="text-red-500">{errorMsg}</p>}
          {successMsg.length > 0 && (
            <div>
              <p className="text-green-500">{successMsg}</p>
              <Link href="/login" className="hover:text-gray-300 hover:underline">Sign In</Link>
            </div>
          )}
        </form>
      </FadeInContainer>
    </div>
  );
}
