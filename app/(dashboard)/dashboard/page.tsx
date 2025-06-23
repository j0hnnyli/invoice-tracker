import { Suspense } from "react";
import Chartsection from "./chartsection/ChartSection";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import RecentInvoices from "./RecentInvoices";


const stats = [
  {
    title : "Total Earnings",
    total : 1120,
    icon : MdOutlineAttachMoney,
    caption : 'Closed Invoice Total',
  },
  {
    title : "Open Invoices",
    total : 1,
    icon : IoPeopleOutline,
    caption : 'Total Invoices Open',
  },
  {
    title : "Closed Invoices",
    total : 2,
    icon : FaRegMoneyBillAlt,
    caption : 'Total Invoices Paid',
  },
  {
    title : "Overdue Invoices",
     total : 1,
    icon : CiCalendar,
    caption : 'Total Overdue Invoices',
  },
]

export default async function Dashboard(){

  return (
    <div>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({title, icon: Icon, caption, total}, i) => (
          <div
            key={title} 
            className="p-2 bg-white/20  rounded-lg font-bold flex flex-col gap-2"
          >
            <p className="playfair flex flex-col-reverse items-start md:flex-row md:items-center justify-between gap-2">
              <span className="text-sm md:text-md">{title}</span>
              <span className="text-lg"><Icon /></span>
            </p>
            <p className="text-xl">{i === 0 && "$ "} {total}</p>
            <p className="text-gray-300 text-xs">{caption}</p>
          </div>
        ))}

      </section>
      
      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        <Suspense
          fallback={
            <div className="w-full lg:w-[70%] h-[300px] lg:h-[500px] bg-white/20 rounded-lg animate-pulse" />
          }
        >
          <Chartsection />          
        </Suspense>

        <RecentInvoices />
      </div>
      
    </div>
  )
}