import { getInvoice } from '@/lib/supabaseDataFns';
import React from 'react';
import PDFViewerComponent from '../../../components/pdf/PDFViewerComponent';
import { FaExclamationTriangle } from "react-icons/fa";
import Link from 'next/link';


type InvoiceViewPageProps = {
  params : Promise<{id : number}>,
}

export default async function InvoiceViewPage({ params }: InvoiceViewPageProps) {
  const id = (await params).id
  const { data, error } = await getInvoice(id)

  if(!data || error){
    return (
      <div className='h-screen w-full flex flex-col items-center justify-center text-white playfair'>
        <div className="flex flex-col items-center space-x-4">
          <FaExclamationTriangle className="text-6xl" />
          <h1 className="text-3xl font-bold">Invoice Unavailable</h1>
        </div>
        <p className="mt-4 text-lg">Sorry, this invoice is no longer available</p>
        <p className="text-lg">Please contact the sender directly</p>

        <Link href='/'
          className='py-2 px-4 bg-white/20 hover:bg-white/10 rounded-lg mt-6'
        >
          InvoTracker
        </Link>
      </div>
    )
  }


  return ( <PDFViewerComponent  data={data}/>);
}