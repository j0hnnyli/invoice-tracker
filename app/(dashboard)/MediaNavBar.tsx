'use client'

import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import SignoutButton from "@/components/SignoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useState } from "react";

type MediaNavBarProps = {
  name : string;
}

export default function MediaNavBar( { name } : MediaNavBarProps){
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav 
      className="fixed bottom-0 w-full h-20 px-5 flex items-center justify-between gap-3 bg-white/10 backdrop-blur-3xl text-white playfair z-50 md:hidden"
    >
       <h2 className="text-2xl font-semibold text-white playfair">
        InvoTracker
      </h2>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="border font-semibold w-10 h-10 rounded-full flex items-center justify-center outline-none">
          {name[0]}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/20 border-none backdrop-blur-3xl text-white">

          <DropdownMenuItem
            onSelect={() => router.push("/dashboard")}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10"
          >
            <MdDashboard className="text-3xl" />
            <p className="text-xl">Dashboard</p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => router.push("/invoices")}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10"
          >
            <LiaFileInvoiceSolid className="text-3xl" />
            <p className="text-xl">Invoices</p>
          </DropdownMenuItem>
          
          <SignoutButton className="justify-center" onComplete={() => setOpen(false)}/>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}