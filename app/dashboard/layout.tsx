import { ReactNode } from "react";
import { TbFileInvoice } from "react-icons/tb";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import SignoutButton from "@/components/SignoutButton";


export default function DashboardLayout({ children } : { children : ReactNode }){
  return (
    <div className="bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)]">
      <div className="max_width mx-auto flex">
        <div className="h-screen w-[30%] max-w-[300px] text-white p-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <TbFileInvoice className="text-7xl"/>
            <h2 className="playfair text-4xl">InvoTracker</h2>
          </div>
          <div className="mt-10 flex flex-col gap-3">

            <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10">
              <MdDashboard className="text-3xl"/>
              <p className="text-xl">DashBoard</p>
            </div>
            
            <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10">
              <LiaFileInvoiceSolid className="text-3xl"/>
              <p className="text-xl">Invoices</p>
            </div>

            <SignoutButton/>
          </div>
        </div>
        <div className="m-5 p-5 bg-white/10 w-full rounded-lg text-white">
          {children}
        </div>
      </div>
    </div>
  )
}