'use client'

import { fadeIn } from "@/lib/motion"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type Props = {
  children : ReactNode;
  direction : "up" | "down" | "left" | "right";
  duration : number;
  delay ?: number;
  className?: string;
}

export default function FadeInContainer( { children, direction , duration, delay, className} : Props ){
  return (
    <motion.div
      variants={fadeIn(direction, 'tween', duration, delay)}
      initial="hidden"
      animate="show"
      className={className}
    >
      { children }
    </motion.div>
  )
}