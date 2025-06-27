import { getEarnings } from "@/lib/supabaseDataFns";
import ChartComponent from "./ChartComponent";

export default async function Chartsection() {
  const earnings = await getEarnings();

  return (
    <section className="overflow-x-auto w-full">
      <ChartComponent earnings={earnings}/>
    </section>
  )
}
