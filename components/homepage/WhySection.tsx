import { TbInvoice, TbMoneybag } from "react-icons/tb";
import { FaRegBell, FaFolderOpen } from "react-icons/fa";
import { RiCashLine } from "react-icons/ri";



export default function WhySection(){
  return (
    <section className="max_width mx-auto my-10 px-5 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="text-white mx-auto">
        <TbInvoice className="text-4xl mx-auto"/>
        <div className="w-20 h-[1px] bg-[var(--primary-color)] rounded-xl mx-auto my-5"/>
        <p className="text-center">
          Create and send professional invoices fast, easy, and client-ready in just minutes
        </p>
      </div>
    
      <div className="text-white">
        <FaRegBell className="text-4xl mx-auto"/>
        <div className="w-20 h-[1px] bg-[var(--primary-color)] rounded-xl mx-auto my-5"/>
        <p className="text-center">
          Easily send invoices via email to clients, vendors, or buyers and send reminders to follow up with just one click        
        </p>
      </div>
    
      <div className="text-white">
        <RiCashLine className="text-4xl mx-auto"/>
        <div className="w-20 h-[1px] bg-[var(--primary-color)] rounded-xl mx-auto my-5"/>
        <p className="text-center">
          Kickstart your cash flow today — send your first invoice in just minutes
        </p>
      </div>
      
      <div className="text-white">
        <TbMoneybag className="text-4xl mx-auto"/>
        <div className="w-20 h-[1px] bg-[var(--primary-color)] rounded-xl mx-auto my-5"/>
        <p className="text-center">
          View your total earnings and monitor your business all in your personal dashboard.        
        </p>
      </div>
     
      <div className="text-white">
        <FaFolderOpen className="text-4xl mx-auto"/>
        <div className="w-20 h-[1px] bg-[var(--primary-color)] rounded-xl mx-auto my-5"/>
        <p className="text-center">
          Easily manage all your invoices with just a few clicks: create, update, track, and organize everything without a hassle.     
        </p>
      </div>


    </section>
  )
}