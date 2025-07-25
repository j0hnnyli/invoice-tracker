import { getInvoice } from "@/lib/supabaseDataFns";
import InvoiceForm from "../invoice-form/InvoiceForm";
import { updateInvoice } from "@/app/actions/updateInvoice";


type InvoicePageProps = {
  params : Promise<{ id : string }> 
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