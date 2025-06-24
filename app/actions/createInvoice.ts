'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoice(formData : FormData) : Promise<{ error: string; } | undefined>{
  const invoiceNumber = formData.get('invoice-number') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const clientName = formData.get('client-name') as string;
  const clientEmail = formData.get('client-email') as string;
  const createdDate = formData.get('created-at') as string;
  const dueDate = formData.get('due-date') as string;
  const descriptionRows = getParsedInvoiceItems(formData);
  const notes = formData.get('notes') as string;
  
  const validations = [
    { condition: !invoiceNumber, error: "Invoice Number is required" },
    { condition: !name || !email, error: "Your name and email are required" },
    { condition: !clientName || !clientEmail, error: "Client's name and email are required" },
    { condition: !dueDate, error: "Due date is required" },
    { condition: descriptionRows.length === 0, error: "At least one invoice item is required" },
    {
      condition: descriptionRows.some((item) => {
        const description = item.description?.trim();
        const amount = parseFloat(item.amount);
        return !description || isNaN(amount) || amount <= 0;
      }),
      error: "Each invoice item must include a description and a non-zero amount.",
    },
  ];

  for (const check of validations) {
    if (check.condition) return { error: check.error };
  }

  revalidatePath('/dashboard', 'layout')
  revalidatePath('/invoices', 'page')
  redirect('/invoices')
}

function getParsedInvoiceItems(formData : FormData){
  const descriptionRows: {
    description: string;
    quantity: string | null;
    rate: string | null;
    amount: string;
  }[] = [];

  let i = 0;
  while (true) {
    const description = formData.get(`description[${i}]`);
    const quantity = formData.get(`quantity[${i}]`);
    const rate = formData.get(`rate[${i}]`);
    const amount = formData.get(`amount[${i}]`);

    if (
      description === null &&
      quantity === null &&
      rate === null &&
      amount === null
    ) {
      break; 
    }

    if (
      description?.toString().trim() === '' &&
      quantity?.toString().trim() === '' &&
      rate?.toString().trim() === ''
    ) {
      i++;
      continue;
    }

    descriptionRows.push({
      description: description?.toString() || '',
      quantity: quantity?.toString() || null,
      rate: rate?.toString() || null,
      amount: amount?.toString() || '0',
    });

    i++;
  }

  return descriptionRows;
}