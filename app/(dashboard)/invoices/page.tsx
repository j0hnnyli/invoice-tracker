import { FaPlus } from "react-icons/fa6";
import InvoiceControls from "./InvoiceControls";
import InvoiceFilter from "./InvoiceFilter";
import Link from "next/link";
import { getAllInvoices } from "@/lib/supabaseDataFns";
import FadeInContainer from "@/components/animation-components/AnimateFadeInContiner";
import { twMerge } from "tailwind-merge";

const statusColors: Record<string, string> = {
  Paid: "text-green-400 bg-green-400/10",
  Open: "text-yellow-400 bg-yellow-400/10",
  Overdue: "text-red-500 bg-red-400/10",
};

type Props = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function Invoices({ searchParams }: Props) {
  const { data, error } = await getAllInvoices();
  const params = await searchParams;
  const filter = params.filter;

  const filtered = filter ? data?.filter((inv) => inv.status === filter) : data;

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-5">
        <FadeInContainer duration={0.4} direction="left">
          <InvoiceFilter />
        </FadeInContainer>
        <FadeInContainer
          duration={0.4}
          direction="left"
          delay={0.2}
          className="flex items-center justify-center"
        >
          <Link
            href="/invoices/new"
            className="p-2 rounded-full bg-white/20 hover:bg-white/10"
          >
            <FaPlus className="text-xl" />
          </Link>
        </FadeInContainer>
      </div>

      {error && (
        <div className="flex flex-col items-center justify-center text-center text-white py-10">
          <h2 className="text-3xl font-bold mb-2 playfair text-red-500">
            {error}
          </h2>
        </div>
      )} 
      {filtered?.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center text-white py-10">
            <h2 className="text-3xl font-bold mb-2 playfair">
              No {filter} Invoices
            </h2>
          </div>
        )
      }

      {filtered?.map((invoice, i) => (
        <FadeInContainer
          duration={0.4}
          direction="left"
          delay={i * 0.2}
          key={invoice.id}
          className="bg-white/20 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between mb-4"
        >
          <div className="w-full flex flex-row md:flex-col items-center justify-between md:items-start md:justify-start ">
            <div>
              <p># {invoice.id}</p>
              <p className="text-lg font-semibold playfair">
                {invoice.client_name}
              </p>
              <p className="text-sm text-white/60">{invoice.client_email}</p>
            </div>
            <p className={
              twMerge("text-sm text-white/60", 
                  invoice.status === "Paid" && "text-green-400",
                  invoice.status === "Overdue" && "text-red-400",
                )
              }
            >
              <span>{invoice.status === "Paid" ? "Closed at :" : "Due :"}</span>
              <span>
                {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                  new Date(
                    invoice.status === "Paid"
                      ? invoice.closed_at || ""
                      : invoice.due_date || ""
                  )
                )}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-between w-full mt-2 md:mt-0">
            <p className="text-xl font-bold text-center">${invoice.amount}</p>

            <p
              className={`mt-1 px-2 py-1 rounded text-sm font-medium w-fit h-fit mx-auto ${
                statusColors[invoice.status ?? ""]
              }`}
            >
              {invoice.status}
            </p>

            <InvoiceControls invoice={invoice}/>
          </div>
        </FadeInContainer>
      ))}
    </div>
  );
}
