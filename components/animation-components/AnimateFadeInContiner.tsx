'use client'

import { fadeIn } from "@/lib/motion"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type Props = {
  children : ReactNode;
  direction : "up" | "down" | "left" | "right";
  duration : number;
}

export default function FadeInContainer( { children, direction , duration} : Props ){
  return (
    <motion.div
      variants={fadeIn(direction, 'tween', duration)}
      initial="hidden"
      animate="show"
    >
      { children }
    </motion.div>
  )
}