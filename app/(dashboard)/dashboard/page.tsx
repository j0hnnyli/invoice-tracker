import { Suspense } from "react";
import Chartsection from "./chartsection/ChartSection";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import RecentOpenInvoices from "./RecentOpenInvoices";
import RecentOverdueInvoices from "./RecentOverdueInvoice";
import { getDashboardInfo } from "@/lib/supabaseDataFns";
import FadeInContainer from "@/components/animation-components/AnimateFadeInContiner";


export default async function Dashboard(){
  const {data, error} = await getDashboardInfo();

  if(error || !data){
    return (
    <div className="text-red-400 bg-white/20 rounded-lg">
      Failed to load dashboard data: {error}
    </div>
    )
  }

  const stats = [
    {
      title : "Total Earnings",
      total : data.totalEarnings,
      icon : MdOutlineAttachMoney,
      caption : 'Closed Invoice Total',
    },
    {
      title : "Open Invoices",
      total : data.openInvoices.length,
      icon : IoPeopleOutline,
      caption : 'Total Invoices Open',
    },
    {
      title : "Closed Invoices",
      total : data.closedInvoices.length,
      icon : FaRegMoneyBillAlt,
      caption : 'Total Invoices Paid',
    },
    {
      title : "Overdue Invoices",
       total : data.overdueInvoices.length,
      icon : CiCalendar,
      caption : 'Total Overdue Invoices',
    },
  ]
  
  return (
    <div>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({title, icon: Icon, caption, total}, i) => (
          <FadeInContainer
            key={title} 
            direction="left"
            duration={0.4}
            delay={i * 0.2}
          >
            <div
              className="p-2 bg-white/20  rounded-lg font-bold flex flex-col gap-2"
            >
              <p className="playfair flex flex-col-reverse items-start md:flex-row md:items-center justify-between gap-2">
                <span className="text-sm md:text-md">{title}</span>
                <span className="text-lg"><Icon /></span>
              </p>
              <p className="text-xl">{i === 0 ? `$ ${total.toLocaleString()}` : total}</p>
              <p className="text-gray-300 text-[10px]">{caption}</p>
            </div>
          </FadeInContainer>
        ))}
      </section>
      
      <div className="my-5">
        <Suspense
          fallback={
            <div className="w-full h-[300px] lg:h-[500px] bg-white/20 rounded-lg animate-pulse" />
          }
        >
          <FadeInContainer
            direction="left"
            duration={0.4}
          >
            <Chartsection />          
          </FadeInContainer>
        </Suspense>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5 ">
        <Suspense fallback={<div className="w-full h-[200px] max-h-[500px] bg-white/20 rounded-lg animate-pulse" />}>
          <FadeInContainer
            direction="left"
            duration={0.4}
            className="w-full"
          >
            <RecentOpenInvoices />
          </FadeInContainer>
        </Suspense>

        <Suspense fallback={<div className="w-full h-[200px] max-h-[500px] bg-white/20 rounded-lg animate-pulse" />}>
         <FadeInContainer
            direction="left"
            duration={0.4}
            delay={0.2}
            className="w-full"
          >
            <RecentOverdueInvoices/>
          </FadeInContainer>
        </Suspense>
      </div>
    </div>
  )
}