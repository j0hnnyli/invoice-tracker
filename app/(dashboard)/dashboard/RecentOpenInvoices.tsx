import { getRecentOpenInvoices } from "@/lib/supabaseDataFns"
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default async function RecentOpenInvoices(){
  const {data, error} = await getRecentOpenInvoices();

  
  return (
    <div className="w-full rounded-lg p-2 overflow-y-auto">
      <div className="p-1">
        <div className="flex items-center justify-between">
          <h2 className="playfair text-xl">Recent Open Invoices</h2>
          <Link href="/invoices" className="text-sm hover:text-gray-300 hover:underline">View all</Link>
        </div>
        <p className="text-sm">Past 30 Days</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {data &&  (
        <div className="mt-5 flex gap-5 max-h-[500px] overflow-y-auto">
          {data?.map((invoice) => (
            <div key={invoice.id}
              className="flex items-center justify-between w-full p-1"
            >
              <div>
                <h2>{invoice.client_name}</h2>
                <p className="text-gray-300 text-xs">{invoice.client_email}</p>
                <p className={twMerge("text-xs",
                    invoice.status === "Open" && "text-yellow-400",
                    invoice.status === "Overdue" && "text-red-400",
                  )}
                >
                  {invoice.status}
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