import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import SignoutButton from "@/components/SignoutButton";
import Link from "next/link";


export default function MediaNavBar(){

  return (
    <nav 
      className="fixed bottom-0 w-full h-20 px-5 flex items-center justify-between gap-3 bg-white/10 backdrop-blur-3xl text-white playfair z-50 md:hidden">

      <Link href="/dashboard" className="flex flex-col items-center justify-center gap-2 p-1 rounded-lg hover:bg-white/10">
        <MdDashboard className="text-3xl"/>
        <p className="text-xl">DashBoard</p>
      </Link>
      
      <Link href="/invoices" className="flex flex-col items-center justify-center gap-2 p-1 rounded-lg hover:bg-white/10">
        <LiaFileInvoiceSolid className="text-3xl"/>
        <p className="text-xl">Invoices</p>
      </Link>

      <SignoutButton className="flex-col justify-center"/>
    </nav>
  )
}