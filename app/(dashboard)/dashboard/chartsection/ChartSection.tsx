import { getEarnings } from "@/lib/supabaseDataFns";
import ChartComponent from "./ChartComponent";

export default async function Chartsection() {
  const earnings = await getEarnings();

  return (
    <section className="my-5 overflow-x-auto">
      <ChartComponent earnings={earnings}/>
    </section>
  )
}
