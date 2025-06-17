import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children : ReactNode
  className?: string;
}

export default function HoverLink({ children, className } : Props){
  return (
     <Link href="/" className={twMerge("group relative text-white border rounded-lg px-4 py-2 overflow-hidden", className)}>
        <span className="relative z-20">
          {children}
        </span>
        <span className="absolute mt-10 w-[120%] left-0 h-40 bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)]  to-[var(--third-color)] group-hover:rotate-[-90deg] origin-top-left transition-all duration-300 ease-in-out z-10"></span>
      </Link>
  )
}