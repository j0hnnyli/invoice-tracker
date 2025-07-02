import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Schedule: e.g., 0 0 * * * (runs every day at midnight)

export async function GET(){
  const supabase = await createClient();

  const { error } = await supabase
    .from("invoices")
    .update({ status : "Overdue" })
    .lt("due_date", new Date().toISOString())
    .eq("status", "Open")
  
    if(error){
      console.error('Failed to update overdue invoices:', error);
      return NextResponse.json({ error: error.message });
    }

     return NextResponse.json({ message: 'Invoices marked as overdue where applicable' });
}