'use server'

import { invoiceSchema } from "@/lib/schema/invoiceSchema";
import { revalidatePath } from "next/cache";
import { createClient } from '@/utils/supabase/server'
import { sendInvoiceEmail } from "@/lib/nodeMailerFns";

export async function updateInvoice(formData : FormData) : Promise<{ error: string, success: string }> {
  const invoiceItemsRaw = formData.get("invoice_items");
  const invoiceIdRaw = formData.get("invoice_id");
  const invoiceId = Number(invoiceIdRaw);

  let invoiceItems = [];
  try {
    invoiceItems = JSON.parse(invoiceItemsRaw as string);
  } catch {
    return { success: "", error: "Failed to parse invoice items." };
  }

  const subtotal =  Number(formData.get("subtotal"))
  const discountValue = Number(formData.get("discount"))
  const totalAfterDiscount = formData.get("discount_type") === "$"
    ? subtotal - discountValue
    : subtotal - (subtotal * discountValue) / 100;

  const rawData = {
    invoiceNumber: formData.get("invoice-number"),
    name : formData.get("name"),
    email : formData.get("email"),
    address : formData.get("address"),
    clientName: formData.get("client-name"),
    clientEmail: formData.get("client-email"),
    clientAddress: formData.get("client-address"),
    createdDate: formData.get("created-at"),
    dueDate: formData.get("due-date"),
    descriptionRows : invoiceItems,
    discountValue: formData.get("discount"),
    discountType: formData.get("discount_type"),
    notes: formData.get("notes"),
    subtotal: subtotal,
    amount: totalAfterDiscount,
  };

  const parsed = invoiceSchema.safeParse(rawData);
  if (!parsed.success) {
    const errorMessage = parsed.error.errors[0].message;
    return { success: "", error: errorMessage };
  }

  const validData = parsed.data;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) {
    return { success: "", error: "User not authenticated." };
  }

  const invoiceNumber = parseInt(validData.invoiceNumber, 10);

  const dbPayload = {
    invoice_number: invoiceNumber,
    user_id : data.user?.id,
    name : validData.name,
    email : validData.email,
    address: validData.address, 
    client_name: validData.clientName,
    client_email: validData.clientEmail,
    client_address: validData.clientAddress,
    created_at: validData.createdDate,
    due_date: validData.dueDate,
    discount_value: validData.discountValue,
    discount_type: validData.discountType,
    note: validData.notes,
    amount: validData.amount,
    sub_total: validData.subtotal,
    invoice_items: validData.descriptionRows,
    status : 'Open'
  };

  const { error } = await supabase
    .from('invoices')
    .update(dbPayload)
    .eq('id', invoiceId); 


  if (error) return { success: "", error: error.message };

  // await sendInvoiceEmail({
  //   senderName: dbPayload.name,
  //   senderEmail: dbPayload.email,
  //   clientName: dbPayload.client_name,
  //   clientEmail: dbPayload.client_email,
  //   invoiceLink: `${process.env.APP_BASE_URL}/pdf/${invoiceId}`,
  //   isUpdate: true,
  // });

  revalidatePath('/dashboard', 'layout');
  revalidatePath('/invoices', 'page');
  return { success: "Invoice Updated", error: "" };
}
