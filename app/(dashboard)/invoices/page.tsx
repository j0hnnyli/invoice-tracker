import { FaPlus } from "react-icons/fa6";
import InvoiceControls from "./InvoiceControls";
import InvoiceFilter from "./InvoiceFilter";
import Link from "next/link";

const mockInvoices = [
  {
    id: 1,
    client: "Acme Corp",
    amount: 450,
    status: "Paid",
    date: "2025-06-01",
  },
  {
    id: 2,
    client: "Globex Inc",
    amount: 1200,
    status: "Open",
    date: "2025-05-21",
  },
  {
    id: 3,
    client: "Wayne Enterprises",
    amount: 980,
    status: "Overdue",
    date: "2025-04-15",
  },
  {
    id: 4,
    client: "Umbrella Corp",
    amount: 670,
    status: "Paid",
    date: "2025-03-10",
  },
];

const statusColors: Record<string, string> = {
  Paid: "text-green-400 bg-green-400/10",
  Open: "text-yellow-400 bg-yellow-400/10",
  Overdue: "text-red-400 bg-red-400/10",
};

type Props = {
  searchParams : { filter? : string}
}

export default async function Invoices({ searchParams } : Props) {
  const params = await searchParams
  const filter = params.filter;

  const filtered = filter
    ? mockInvoices.filter((inv) => inv.status === filter)
    : mockInvoices;

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-5">
        <InvoiceFilter />
        <Link href="/newinvoice" className="p-2 rounded-full bg-white/20 hover:bg-white/10">
          <FaPlus className="text-xl" />
        </Link>
      </div>

      {mockInvoices.length === 0 && ( 
        <div className="flex flex-col items-center justify-center text-center text-white py-10">
          <h2 className="text-3xl font-bold mb-2 playfair">No Invoices</h2>
          <p className="text-lg">Add your first invoice now</p>
          <p className="text-sm text-gray-300 mt-1">It only takes a few minutes</p>
        </div>
      )}

      {filtered.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white/20 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between mb-4"
          >
            <div className="w-full flex flex-row md:flex-col items-center justify-between md:items-start md:justify-start">
              <p className="text-lg font-semibold playfair">{invoice.client}</p>
              <p className="text-sm text-white/60">{invoice.date}</p>
            </div>

            <div className="flex items-center justify-between w-full mt-2 md:mt-0">
              <p className="text-xl font-bold text-center">${invoice.amount}</p>

              <p
                className={`mt-1 px-2 py-1 rounded text-sm font-medium w-fit h-fit mx-auto ${statusColors[invoice.status]}`}
              >
                {invoice.status}
              </p>

              <InvoiceControls />
            </div>
          </div>
        ))
      }
 
    </div>
  );
}
