import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function getEarnings() {
  const supabase = await createClient();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const { data, error } = await supabase
    .from("invoices")
    .select("amount, closed_at")
    .eq("status", "Paid");

  if (error) {
    throw new Error(error.message);
  }

  const filtered = data?.filter((invoice) => {
    const invoiceYear = new Date(invoice.closed_at || "").getFullYear();
    return invoiceYear === currentYear;
  });


  const earningsByMonth = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthlyTotal = filtered
      ?.filter(
        (invoice) => new Date(invoice.closed_at || "").getMonth() + 1 === month
      )
      .reduce((sum, invoice) => sum + (invoice.amount ?? 0), 0);

    const monthName = new Date(currentYear, i).toLocaleString("default", {
      month: "short",
    });

    return {
      month: monthName,
      earnings: monthlyTotal,
    };
  });

  return earningsByMonth.slice(0, currentMonth + 1);
}

export const getAllInvoices = async () => {
  const supabase = await createClient();

  const { data: invoices, error } = await supabase
    .from("invoices")
    .select("*")

  if (error) {
    return { data : null,  error: error.message }
  }

  return {data : invoices, error : null} ;
};

export const getInvoice = async (invoiceId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .maybeSingle(); 

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

export const getRecentOpenInvoices = async () => {
  const supabase = await createClient();


  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isoDate = thirtyDaysAgo.toISOString();

  const { data, error } = await supabase
  .from('invoices')
  .select('*')
  .eq('status', 'Open')
  .gte('created_at', isoDate);

  if(error){
    return { data : null, error : error.message}
  }

  return { data , error : null}
}

export const getRecentOverdueInvoices = async () => {
  const supabase = await createClient();


  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isoDate = thirtyDaysAgo.toISOString();

  const { data, error } = await supabase
  .from('invoices')
  .select('*')
  .eq('status', 'Overdue')
  .gte('created_at', isoDate);

  if(error){
    return { data : null, error : error.message}
  }

  return { data , error : null}
}

export const getDashboardInfo = async () => {
  const {data: invoices, error} = await getAllInvoices();

  if(!invoices || error){
    return {data: null, error : error}
  }

  const totalEarnings = invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const openInvoices = invoices.filter(inv => inv.status === 'Open');
  const closedInvoices = invoices.filter(inv => inv.status === 'Paid');
  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue');

  return {
    data : {
      totalEarnings,
      openInvoices,
      closedInvoices,
      overdueInvoices
    },
    error: null
  }
}
