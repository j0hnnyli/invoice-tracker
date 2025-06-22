'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { RiMenuFold4Fill } from "react-icons/ri";
import { TbFileInvoice } from "react-icons/tb";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import SignoutButton from "@/components/SignoutButton";
import Link from "next/link";
import { useState } from "react";

type Props = {
  name : string;
}

export default function MediaSideBar({ name } : Props){
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger 
        className="fixed left-2 top-2 p-2 bg-white/40 backdrop-blur-3xl rounded-full bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)] md:hidden"
      >
        <RiMenuFold4Fill className="text-white text-xl"/>
      </SheetTrigger>

      <SheetContent 
        side="left"
        className="bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)] text-white border-none"
      >
        <SheetHeader className="flex flex-col items-center justify-center mt-10">
          <SheetTitle> <TbFileInvoice className="text-7xl"/> </SheetTitle>
          <SheetDescription className="text-4xl playfair">
            InvoTracker
          </SheetDescription>
          <p className="text-xl playfair">{name}</p>
        </SheetHeader>

        <div className="mt-5 flex flex-col px-5 gap-3">
            <Link href="/dashboard" className="rounded-lg hover:bg-white/10">
              <SheetClose className="flex items-center gap-2">
                <MdDashboard className="text-3xl"/>
                <p className="text-xl">DashBoard</p>
              </SheetClose>
            </Link>
          
          <Link href="/invoices" className="rounded-lg hover:bg-white/10">
            <SheetClose className="flex items-center gap-2 p-1 ">
              <LiaFileInvoiceSolid className="text-3xl"/>
              <p className="text-xl">Invoices</p>
            </SheetClose>
          </Link>

          <SignoutButton onSignoutComplete={() => setIsOpen(false)}/>
        </div>
      </SheetContent>
    </Sheet>
  )
}