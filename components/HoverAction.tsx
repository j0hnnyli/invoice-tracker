'use client'

import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string; // Optional now
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function HoverAction({ children, className, href, onClick, type = "button" }: Props) {
  const baseClass = twMerge(
    "group relative text-white border rounded-lg px-4 py-2 overflow-hidden",
    className
  );

  const hoverEffect = (
    <>
      <span className="relative z-20">{children}</span>
      <span className="absolute mt-10 w-[120%] left-0 h-40 bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)] group-hover:rotate-[-90deg] origin-top-left transition-all duration-300 ease-in-out z-10"></span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {hoverEffect}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {hoverEffect}
    </button>
  );
}
