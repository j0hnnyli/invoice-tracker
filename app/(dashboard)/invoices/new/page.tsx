"use client";

import { createInvoice } from "@/app/actions/createInvoice";
import InvoiceForm from "../invoice-form/InvoiceForm";

export default function NewInvoice() {
  return (
    <InvoiceForm 
      submitAction={createInvoice}
    />
  )
}
