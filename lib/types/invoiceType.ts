export type InvoiceItems = {
  rate: number, 
  amount: number, 
  quantity: number, 
  description: string,
}


export type InvoiceType= {
  id: number,
  user_id: string,
  amount: number,
  status: string,
  due_date: string,
  created_at: string,
  invoice_items: InvoiceItems[],
  client_name: string,
  client_email: string,
  invoice_number: number,
  discount_value: string,
  discount_type: string,
  note: string,
}
