import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

export default function InvoiceControls(){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-lg bg-white/20 hover:bg-white/10 outline-none"> 
        <HiOutlineDotsHorizontal className="text-xl" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white/20 border-none backdrop-blur-3xl text-white">
        <DropdownMenuItem className="text-lg hover:bg-white/20">Paid</DropdownMenuItem>
        <DropdownMenuItem className="text-lg hover:bg-white/20">Update</DropdownMenuItem>
        <DropdownMenuItem className="text-lg hover:bg-white/20">Remind</DropdownMenuItem>
        <DropdownMenuItem className="text-lg hover:bg-white/20">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}