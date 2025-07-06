import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest){
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("invoices")
    .update({ status : "Overdue" })
    .lt("due_date", new Date().toISOString())
    .eq("status", "Open")
  
    if(error){
      return NextResponse.json({ error: error.message });
    }

     return NextResponse.json({ message: 'Invoices marked as overdue where applicable' });
}