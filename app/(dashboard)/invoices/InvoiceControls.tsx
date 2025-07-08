'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { updateStatus } from "@/app/actions/updateStatus"
import { deleteInvoice } from "@/app/actions/deleteInvoice"
import { sendReminder } from "@/app/actions/sendReminder"
import { FaPencil, FaEnvelopeOpenText } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { FaEye, FaBell, FaRegTrashAlt } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { InvoiceType } from "@/lib/types/invoiceType"
import DownloadLink from "@/components/pdf/DownloadLink"


type InvoiceControlsProps = {
  invoice: Omit<InvoiceType, "closed_at" | "user_id"> ;
}

export default function InvoiceControls({ invoice } : InvoiceControlsProps){
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [status, setStatus] = useState<"Paid" | "Delete" | "Open" | "reminder"| null>(null);
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

  const handleSendReminder = () => {
    setStatus("reminder")
    startTransition(async () => {
      await sendReminder(
        invoice.name!,
        invoice.email!,
        invoice.client_name!,
        invoice.client_email!,
        `${process.env.APP_BASE_URL}/pdf/${invoice.id}`
      )
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
          className="hover:bg-white/20 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span>{(invoice.status === "Open" || invoice.status === "Overdue" ) ? <MdPaid/> : <FaEnvelopeOpenText/>}</span>
            <span>{(invoice.status === "Open" || invoice.status === "Overdue" ) ? "Paid" : "Reopen"}</span>
          </div>
          <span>{(status === "Paid" || status === "Open") && <CgSpinnerTwoAlt className="animate-spin"/>}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onSelect={() => window.open(`/pdf/${invoice.id}`)}
          className="hover:bg-white/20 cursor-pointer flex items-center gap-2" 
        >
          <span><FaEye/></span>
          <span>View</span>
        </DropdownMenuItem>
       
        <DropdownMenuItem
          onSelect={() => router.push(`/invoices/${invoice.id}`)}
          className="hover:bg-white/20 cursor-pointer flex items-center gap-2" 
        >
          <span><FaPencil/></span>
          <span>Update</span>
        </DropdownMenuItem>

        {invoice.status === "Overdue" && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleSendReminder();
            }}
            disabled={status === "reminder"}
            className="hover:bg-white/20 cursor-pointer flex items-center gap-2" 
          >
            <span><FaBell/></span>
            <span>Reminder</span>
            <span>{status === "reminder" && <CgSpinnerTwoAlt className="animate-spin"/>}</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem className="hover:bg-white/20">
          <DownloadLink data={invoice} />
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onSelect={(e) => {
            e.preventDefault();
            handleDeleteInvoice();
          }}
          disabled={status === "Delete"}
          className="hover:bg-white/20 flex items-center justify-between cursor-pointer"
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