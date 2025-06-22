import { Suspense } from "react";
import Chartsection from "./chartsection/ChartSection";

export default async function Dashboard(){

  return (
    <div>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col items-center justify-center h-[150px] bg-white/20 rounded-lg md:text-lg font-bold">
          <p>$ 1120</p>
          <p className="playfair">Total Earnings</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[150px] bg-white/20 rounded-lg md:text-lg font-bold">
          <p>1</p>
          <p className="playfair">Open Invoices</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[150px] bg-white/20 rounded-lg md:text-lg font-bold">
          <p>2</p>
          <p className="playfair">Closed Invoices</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[150px] bg-white/20 rounded-lg md:text-lg font-bold">
          <p>1</p>
          <p className="playfair">Overdue Invoices</p>
        </div>
      </section>

      <Suspense fallback={<div className="h-[500px] bg-white/20 rounded-lg animate-pulse my-5"/>}>
        <Chartsection/>
      </Suspense>
      
    </div>
  )
}