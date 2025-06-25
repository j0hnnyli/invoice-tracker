'use client'

import { whySectionInfo } from "@/lib/content/whySectionInfo";
import { motion } from "framer-motion";

export default function WhySection() {
  return (
    <section className="max_width mx-auto my-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
      {whySectionInfo.map(({ icon: Icon, text }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Icon className="text-4xl mx-auto text-white" />
          </motion.div>

          <div className="w-20 h-[2px] bg-[var(--primary-color)] rounded-xl mx-auto my-5" />

          <p className="text-center text-gray-200 leading-relaxed">{text}</p>
        </motion.div>
      ))}
    </section>
  );
}
