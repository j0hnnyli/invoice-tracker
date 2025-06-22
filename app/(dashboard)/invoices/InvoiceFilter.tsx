'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

export default function InvoiceFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "All") {
      params.delete("filter")
    } else {
      params.set("filter", value)
    }

    router.replace(`?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleFilterChange}>
      <SelectTrigger className="bg-white/20 border-none backdrop-blur-3xl text-white">
        <SelectValue placeholder="All Invoices" />
      </SelectTrigger>

      <SelectContent className="bg-white/20 border-none backdrop-blur-3xl text-white">
        <SelectItem value="All" className="text-lg hover:bg-white/20">All Invoice</SelectItem>
        <SelectItem value="Open" className="text-lg hover:bg-white/20">Open</SelectItem>
        <SelectItem value="Paid" className="text-lg hover:bg-white/20">Paid</SelectItem>
        <SelectItem value="Overdue" className="text-lg hover:bg-white/20">Overdue</SelectItem>
      </SelectContent>
    </Select>
  )
}
