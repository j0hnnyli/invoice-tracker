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
import { useState } from "react";
import { links } from "@/lib/link";
import Link from "next/link";

type MediaNavBarMenuProps = {
  inital : string;
}

export default function MediaNavBarMenu({inital} : MediaNavBarMenuProps){
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="border font-semibold w-10 h-10 rounded-full flex items-center justify-center outline-none">
        {inital}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/20 border-none backdrop-blur-3xl text-white">        
        <DropdownMenuItem onClick={() => setOpen(false)}>
          <Link 
            href={links.dashboard}
            className="flex items-center gap-2 rounded-lg hover:bg-white/10"
          >
            <MdDashboard className="text-3xl" />
            <p className="text-xl">Dashboard</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setOpen(false)}>
          <Link 
            href={links.invoices}
            className="flex items-center gap-2 rounded-lg hover:bg-white/10"
          >
            <LiaFileInvoiceSolid className="text-3xl" />
            <p className="text-xl">Invoices</p>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <SignoutButton className="justify-center" onComplete={() => setOpen(false)}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}