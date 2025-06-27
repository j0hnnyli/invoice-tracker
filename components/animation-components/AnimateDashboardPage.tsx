'use client'

import { ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from "next/navigation";

type Props = {
  children : ReactNode;
  className ?: string;
}

export default function AnimateDashboardPage({ children, className } : Props ){
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x : 50, opacity: 0 }}
        animate={{ x : 0, opacity: 1 }}
        transition={{ duration : 0.4 }}
        exit={{ x: 50, opacity: 0 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}