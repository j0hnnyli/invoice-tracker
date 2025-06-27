'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function deleteInvoice(id : number){
  const supabase = await createClient();

  const { error } = await supabase.from("invoices").delete().eq("id", id);

  if( error ) {
    throw new Error(`Deleting Invoice ${id} Failed : ${error.message}`)
  }

  revalidatePath("/dashboard", "layout");
  revalidatePath("/invoices", "page");
}