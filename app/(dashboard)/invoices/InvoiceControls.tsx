import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

type InvoiceControlsProps = {
  id : number
}

export default function InvoiceControls({ id } : InvoiceControlsProps){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-lg bg-white/20 hover:bg-white/10 outline-none"> 
        <HiOutlineDotsHorizontal className="text-xl" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white/20 border-none backdrop-blur-3xl text-white">
        <DropdownMenuItem className="text-lg hover:bg-white/20">Paid</DropdownMenuItem>
        <DropdownMenuItem className=" p-0" >
          <Link href={`/invoices/${id}`} className="w-full px-2 py-1 text-lg hover:bg-white/20 rounded-sm">
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-lg hover:bg-white/20">Remind</DropdownMenuItem>
        <DropdownMenuItem className="text-lg hover:bg-white/20">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}