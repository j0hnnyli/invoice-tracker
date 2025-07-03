import { Database } from "@/lib/types/supabase";

export type InvoiceType = Database["public"]["Tables"]["invoices"]["Row"];


export type InvoiceItem = {
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}