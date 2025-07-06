import { getInvoice } from '@/lib/supabaseDataFns';
import React from 'react';
import PDFViewerComponent from '../../../components/pdf/PDFViewerComponent';

type InvoiceViewPageProps = {
  params : Promise<{id : number}>,
}

export default async function InvoiceViewPage({ params }: InvoiceViewPageProps) {
  const id = (await params).id
  const { data, error } = await getInvoice(id)

  if(!data || error){
    return <p>Something Went Wrong!</p>
  }


  return ( <PDFViewerComponent  data={data}/>);
}