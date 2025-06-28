'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

type InvoiceStatus = 'Open' | 'Overdue' | 'Paid';

export async function updateStatus(status: InvoiceStatus, id: number) {
  const supabase = await createClient();

  const updateFields: Record<string, string | Date | null> = {
    status,
    closed_at: status === "Paid" ? new Date() : null, 
  };

  const { error } = await supabase
    .from('invoices')
    .update(updateFields)
    .eq('id', id);

  if (error) {
    throw new Error(`Update Status for Invoice ${id} Failed: ${error.message}`);
  }

  revalidatePath('/dashboard', 'layout');
  revalidatePath('/invoices', 'page');
}