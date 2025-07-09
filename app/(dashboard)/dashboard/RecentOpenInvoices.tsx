import { links } from "@/lib/link";
import { getRecentOpenInvoices } from "@/lib/supabaseDataFns"
import Link from "next/link";

export default async function RecentOpenInvoices(){
  const {data, error} = await getRecentOpenInvoices();

  
  return (
    <div className="w-full rounded-lg p-2 overflow-y-auto">
      <div className="p-1">
        <div className="flex items-center justify-between">
          <h2 className="playfair text-xl">Recent Open Invoices</h2>
          <Link href={links.invoices} className="text-sm hover:text-gray-300 hover:underline">View all</Link>
        </div>
        <p className="text-sm">Past 30 Days</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {data?.length === 0 && <p className="mt-5 text-gray-300">No Recent Open Invoices</p>}
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
                  className="text-yellow-400 text-xs"
                > 
                  Created at : 
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(invoice.created_at))}
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