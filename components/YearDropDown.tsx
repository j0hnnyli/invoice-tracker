import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUserYears } from "@/lib/supabaseDataFns";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";




export default async function YearDropDown() {
  const years = await getUserYears();


  return (
    <DropdownMenu>
    <DropdownMenuTrigger
      className="flex items-center justify-between gap-2 rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition outline-none focus:ring-2 focus:ring-white/50"
    >
      <span>{new Date().getFullYear()}</span>
      <FaChevronDown className="text-xs opacity-80" />
    </DropdownMenuTrigger>
      <DropdownMenuContent align="start" defaultValue={new Date().getFullYear()}
        className="bg-white/20 border-none backdrop-blur-3xl text-white"
      >
        {years.map((year) => (
          <Link
            href={`?year=${year}`}
            key={year}
          >
            <DropdownMenuItem 
              className="hover:bg-white/20"
            >
              {year}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}