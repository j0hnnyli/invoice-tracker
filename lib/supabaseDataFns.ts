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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const { data, error } = await supabase
    .from("invoices")
    .select("amount, created_at")
    .eq("user-id", user.id)
    .eq("status", "paid");

  if (error) {
    throw new Error(error.message);
  }

  const filtered = data?.filter((invoice) => {
    const invoiceYear = new Date(invoice.created_at).getFullYear();
    return invoiceYear === currentYear;
  });


  const earningsByMonth = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthlyTotal = filtered
      ?.filter(
        (invoice) => new Date(invoice.created_at).getMonth() + 1 === month
      )
      .reduce((sum, invoice) => sum + invoice.amount, 0) ?? 0;

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

