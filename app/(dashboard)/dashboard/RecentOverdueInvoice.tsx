import { getRecentOverdueInvoices } from "@/lib/supabaseDataFns"
import Link from "next/link";

export default async function RecentOverdueInvoices(){
  const {data, error} = await getRecentOverdueInvoices();

  
  return (
    <div className="w-full rounded-lg p-2 overflow-y-auto">
      <div className="p-1">
        <div className="flex items-center justify-between">
          <h2 className="playfair text-xl">Recent Overdue Invoices</h2>
          <Link href="/invoices" className="text-sm hover:text-gray-300 hover:underline">View all</Link>
        </div>
        <p className="text-sm">Past 30 Days</p>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
      {data?.length === 0 && <p className="mt-5">No Recent Overdue Invoices</p>}
      {data &&  (
        <div className="mt-5 flex gap-5 max-h-[500px] overflow-y-auto">
          {data?.map((invoice) => (
            <div key={invoice.id}
              className="flex items-center justify-between w-full p-1"
            >
              <div>
                <h2>{invoice.client_name}</h2>
                <p className="text-gray-300 text-xs">{invoice.client_email}</p>
                <p 
                  className="text-red-400 text-xs"
                > 
                  Due at : 
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(invoice.due_date || ""))}
                </p>
              </div>

              <p className="font-bold">$ {invoice.amount}</p>
            </div>
          ))}
        </div>
        )
      }
    </div>
  )
}