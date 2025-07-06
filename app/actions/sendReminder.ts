'use server'

import { sendReminderInvoiceEmail } from "@/lib/nodeMailerFns";

export async function sendReminder(
  senderName : string,
  senderEmail: string,
  clientName: string,
  clientEmail: string,
  invoiceLink: string,
){
  try{
    await sendReminderInvoiceEmail({
      senderName,
      senderEmail,
      clientName,
      clientEmail,
      invoiceLink
    })

    return {success : "Reminder Email Sent", error : ""}
  }catch{
    return {success : "", error : "Something Went Wrong"}
  }
  
}