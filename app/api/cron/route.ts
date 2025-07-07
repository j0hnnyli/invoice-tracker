import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest){
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  const { error } = await supabaseAdmin
    .from("invoices")
    .update({ status : "Overdue" })
    .lt("due_date", new Date().toISOString())
    .eq("status", "Open")
  
  
  if(error){
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ message: 'Invoices marked as overdue where applicable' });
}