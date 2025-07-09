import { TbFileInvoice } from "react-icons/tb";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import SignoutButton from "@/components/SignoutButton";
import Link from "next/link";
import YearDropDown from "@/components/YearDropDown";
import { links } from "@/lib/link";

type Props = {
  name : string;
}

export default function SideBar({ name } : Props){
  return (
    <div className="h-screen w-[250px] text-white p-5 hidden md:inline-block sticky top-0">
      <div className="flex flex-col items-center justify-center gap-2 playfair ">
        <TbFileInvoice className="text-7xl"/>
        <h2 className="text-4xl">InvoTracker</h2>
        <p className="mt-2 text-white/70 text-xl"> <strong>{name}</strong></p>  
        <YearDropDown />
      </div>
      <div className="mt-10 flex flex-col gap-3 playfair">
        <Link href={links.dashboard} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10">
          <MdDashboard className="text-3xl"/>
          <p className="text-xl">DashBoard</p>
        </Link>
        
        <Link href={links.invoices} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10">
          <LiaFileInvoiceSolid className="text-3xl"/>
          <p className="text-xl">Invoices</p>
        </Link>

        <SignoutButton />
      </div>
    </div>
  )
}