const invoices = [
  {
    id: 1,
    client: 'Acme Corp',
    email : 'acme@acmecorp.com',
    amount: 450,
    status: 'Paid',
    date: '2025-06-01',
  },
];

export default function RecentInvoices(){
  return (
    <div className="w-full lg:w-[30%] rounded-lg p-2 overflow-y-auto">
      <h2 className="playfair text-2xl">Recent Invoices</h2>

      <div className="mt-5 flex gap-5">
        {invoices.map((invoice) => (
          <div key={invoice.id}
            className="flex items-center justify-between w-full"
          >
            <div>
              <h2>{invoice.client}</h2>
              <p className="text-gray-300 text-xs">{invoice.email}</p>
            </div>

            <p className="font-bold">$ {invoice.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}