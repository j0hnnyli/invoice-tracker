'use client'

import { ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  children : ReactNode;
  modeKey : string;
}

export default function AnimateForm({ children, modeKey } : Props ){
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ x : 50, opacity: 0 }}
        animate={{ x : 0, opacity: 1 }}
        transition={{ duration : 0.4 }}
        exit={{ x: -50, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}