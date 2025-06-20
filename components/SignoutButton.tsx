'use client'

import { signout } from "@/app/actions/signout";
import { useTransition } from "react";
import { PiSignOutFill } from "react-icons/pi";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function SignoutButton(){
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      onClick={() => startTransition(() => signout())}
      className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 cursor-pointer"
    >
      {isPending ? <CgSpinnerTwoAlt className="text-3xl animate-spin"/> : <PiSignOutFill className="text-3xl"/>}
      <p className="text-xl">Sign Out</p>
    </button>
  )
}