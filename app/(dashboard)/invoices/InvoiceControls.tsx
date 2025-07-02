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
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { deleteInvoice } from "@/app/actions/deleteInvoice"
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRouter } from "next/navigation"
import DownloadLink from "@/components/pdf/DownloadLink"
import { InvoiceType } from "@/lib/types/invoiceType"

type InvoiceControlsProps = {
  invoice: Omit<InvoiceType, "closed_at" | "user_id"> ;
}

export default function InvoiceControls({ invoice } : InvoiceControlsProps){
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [status, setStatus] = useState<"Paid" | "Delete" | "Open" | null>(null);
  const [open, setOpen] = useState(false);

  const handleUpdateStatus = (status : "Open" | "Paid") => {
    setStatus(status)
    startTransition(async () => {
      await updateStatus(status, invoice.id)
      setOpen(false) 
      setStatus(null);
    })
  }

  const handleDeleteInvoice = () => {
    setStatus('Delete')
    startTransition(async () => {
      await deleteInvoice(invoice.id)
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
            handleUpdateStatus(invoice.status === "Open" ? "Paid" : "Open")
          }}
          disabled={status === "Paid" || status === "Open"}
          className="text-lg hover:bg-white/20 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span>{invoice.status === "Open" ? <MdPaid/> : <FaEnvelopeOpenText/>}</span>
            <span>{invoice.status === "Open" ? "Paid" : "Reopen"}</span>
          </div>
          <span>{(status === "Paid" || status === "Open") && <CgSpinnerTwoAlt className="animate-spin"/>}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onSelect={() => router.push(`/invoices/${invoice.id}`)}
          className="text-lg hover:bg-white/20 cursor-pointer flex items-center gap-2" 
        >
          <span><FaPencil/></span>
          <span>Update</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="hover:bg-white/20">
          <DownloadLink data={invoice}/>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onSelect={(e) => {
            e.preventDefault();
            handleDeleteInvoice();
          }}
          disabled={status === "Delete"}
          className="text-lg hover:bg-white/20 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span><FaRegTrashAlt className="text-red-400"/></span>
            <span>Delete</span>
          </div>
          <span>{status === "Delete" && <CgSpinnerTwoAlt className="animate-spin"/>}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}