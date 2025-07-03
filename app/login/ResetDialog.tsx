'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sendResetPasswordEmail } from "../actions/resetpassword"
import { FormEvent, useState } from "react"
import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function ResetDialog(){
  const [ state, setState ] = useState<{success : string , error : string}>({success : "" , error : ""});
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const handleSubmitReset = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await sendResetPasswordEmail(formData);

    setState(result)
    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:text-gray-300 hover:underline cursor-pointer">Reset Password</DialogTrigger>

      <DialogContent className="bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)] text-white">
        <DialogHeader>
          <DialogTitle className="playfair text-2xl">Reset Password</DialogTitle>
          <DialogDescription className="text-gray-300">
            Enter your email to recieve a reset link
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => handleSubmitReset(e)}>
          <div className="flex flex-col gap-2 border-b">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email : </label>
              {state.error.length > 0 && <p className="text-red-500 font-bold text-sm">{state.error}*</p>}
              {state.success.length > 0 && <p className="text-green-500 font-bold">{state.success}</p>}
            </div>
            <input 
              type="text" 
              name="email" 
              id="email"
              placeholder="Enter your Email"
              onChange={() => {
                if(state.error.length > 0){ 
                  setState({...state, error: ""})
                } 
              }} 
              className="outline-none py-1"
            />
          </div>
          <button 
            className="mt-2 w-full py-2 bg-white/10 hover:bg-white/20 cursor-pointer flex items-center justify-center playfair"
          >
            {isLoading ? <CgSpinnerTwoAlt className="text-xl text-white animate-spin"/> : " Submit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}