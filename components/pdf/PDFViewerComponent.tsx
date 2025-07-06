'use client'

import Invoice from '@/components/pdf/Invoice';
import { InvoiceType } from '@/lib/types/invoiceType';
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { CgSpinnerTwoAlt } from "react-icons/cg";


type PDFViewerComponentProps = {
  data : Omit<InvoiceType, "id" | "user_id" | "status" | "closed_at">;
}

export default function PDFViewerComponent({ data }: PDFViewerComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

    if (!isMounted) {
      return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-900 text-xl text-white '>
          <CgSpinnerTwoAlt className='animate-spin'/>
          <p className='playfair'>Loading PDF...</p>
        </div>
      );
    }

  return (
    <div className="w-full h-screen">
      {isMounted && (
          <PDFViewer width="100%" height="100%">
            <Invoice data={data} />
          </PDFViewer>
      )}
    </div>
  );
}