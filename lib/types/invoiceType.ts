import { Database } from "@/lib/types/supabase";

export type InvoiceType = Database["public"]["Tables"]["invoices"]["Row"];