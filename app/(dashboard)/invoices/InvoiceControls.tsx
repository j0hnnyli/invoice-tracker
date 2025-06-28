'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useTransition } from "react"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { updateStatus } from "@/app/actions/updateStatus"
// import { deleteInvoice } from "@/app/actions/deleteInvoice"
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRouter } from "next/navigation"

type InvoiceControlsProps = {
  id : number;
  invoiceStatus : string;
}

export default function InvoiceControls({ id, invoiceStatus } : InvoiceControlsProps){
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [status, setStatus] = useState<"Paid" | "Delete" | "Open" | null>(null);
  const [open, setOpen] = useState(false);

  const handleUpdateStatus = (status : "Open" | "Paid") => {
    setStatus(status)
    startTransition(async () => {
      await updateStatus(status, id)
      setOpen(false) 
      setStatus(null);
    })
  }

  const handleDeleteInvoice = () => {
    setStatus('Delete')
    startTransition(async () => {
      // await deleteInvoice(id)
      setOpen(false) 
      setStatus(null);
    })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="p-2 rounded-lg bg-white/20 hover:bg-white/10 outline-none cursor-pointer"> 
        <HiOutlineDotsHorizontal className="text-xl" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white/20 border-none backdrop-blur-3xl text-white">
        <DropdownMenuItem 
          onSelect={(e) => {
            e.preventDefault()
            handleUpdateStatus(invoiceStatus === "Open" ? "Paid" : "Open")
          }}
          disabled={status === "Paid" || status === "Open"}
          className="text-lg hover:bg-white/20 flex items-center justify-between cursor-pointer"
        >
          <span>{invoiceStatus === "Open" ? "Paid" : "Reopen"}</span>
          <span>{(status === "Paid" || status === "Open") && <CgSpinnerTwoAlt className="animate-spin"/>}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => router.push(`/invoices/${id}`)}
          className="text-lg hover:bg-white/20 cursor-pointer" 
        >
          Update
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="text-lg hover:bg-white/20">Remind</DropdownMenuItem> */}
        <DropdownMenuItem 
          onSelect={(e) => {
            e.preventDefault();
            handleDeleteInvoice();
          }}
          disabled={status === "Delete"}
          className="text-lg hover:bg-white/20 flex items-center justify-between cursor-pointer"
        >
          <span>Delete</span>
          <span>{status === "Delete" && <CgSpinnerTwoAlt className="animate-spin"/>}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}