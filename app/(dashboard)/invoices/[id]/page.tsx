import { getInvoice } from "@/lib/supabaseDataFns";
import InvoiceForm from "../invoice-form/InvoiceForm";
import { updateInvoice } from "@/app/actions/updateInvoice";
import { Database } from "@/lib/types/supabase";

export type InvoiceType = Database['public']['Tables']['invoices']['Row'];

type InvoicePageProps = {
  params : { [id : string] : string } 
}

export const revalidate = 0;

export default async function InvoicePage({ params } : InvoicePageProps) {
  const invoiceId = (await params).id;
  const {data : invoice, error} = await getInvoice(Number(invoiceId))

  if(error){
    return ( <p className="text-red-500">{error}</p>)
  }

  return (
    <InvoiceForm
      initialFormValues={invoice}
      submitAction={updateInvoice}
    />
  )
}