'use client'

import AnimateBorderBottomComponent from "@/components/AnimateBorderBottomComponent";
import HoverAction from "@/components/HoverAction";
import TogglePasswordInput from "@/components/TogglePasswordInput";
import Link from "next/link";

export default function LoginForm(){
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitted');
      }} 
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
            className="outline-none py-1"
          />
        </AnimateBorderBottomComponent>
      </div>
    
      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="password" className="text-xl playfair">Password:</label>
        <TogglePasswordInput placeholder="Enter Your Password . . ." id="password" />
      </div>

      <HoverAction type="submit" className="mb-3 playfair text-lg border py-1 px-4 rounded-lg cursor-pointer">
        Log In
      </HoverAction>

      <p className="text-sm text-white">
        Don&apos;t have an account?{" "}
        <Link href="?mode=signup" className="hover:text-gray-300 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  )
}