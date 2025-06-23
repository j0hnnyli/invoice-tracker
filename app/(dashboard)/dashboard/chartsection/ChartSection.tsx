// import { getEarnings } from "@/lib/supabaseDataFns";
import ChartComponent from "./ChartComponent";

export const mockEarningsData = [
  { month: "Jan", earnings: 120 },
  { month: "Feb", earnings: 300 },
  { month: "Mar", earnings: 450 },
  { month: "Apr", earnings: 200 },
  { month: "May", earnings: 500 },
  { month: "Jun", earnings: 380 },
];

export default async function Chartsection() {
  // const earnings = await getEarnings();

  return (
    <section className="overflow-x-auto lg:w-[70%]">
      <ChartComponent earnings={mockEarningsData}/>
    </section>
  )
}
