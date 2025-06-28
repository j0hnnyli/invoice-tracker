'use client';

import { FaClipboardList } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from "@/lib/motion";

const steps = [
  {
    step: "Create Your Account",
    description: "Sign up to access your personalized dashboard and start tracking your earnings effortlessly.",
    icon: FaClipboardList,
  },
  {
    step: "Send Invoices",
    description: "Easily create and send professional invoices to your clients in just a few clicks.",
    icon: IoPeopleOutline,
  },
  {
    step: "Track & Manage with Ease",
    description: "Monitor invoice status, manage payments, and stay organized all in one place.",
    icon: MdManageAccounts,
  },
];

export default function StepSection() {
  return (
    <section className="w-full text-white max_width mx-auto my-10 px-5">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 playfair">
        Start Earning in 3 Easy Steps
      </h2>
      <p className="text-lg mb-10 text-gray-300">
        Here&apos;s how InvoTracker helps you take control of your earnings quickly and easily.
      </p>

      <motion.div
        variants={staggerContainer(0.2, 0.2)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once : false, amount: 0.25}}
        className="relative border-l-2 border-white/20 pl-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {steps.map(({step, icon : Icon, description}, i) => (
          <motion.div
            key={step}
            variants={fadeIn('up', 'spring')}
            className="relative"
          >
            <div className="absolute -left-3 -top-1 w-8 h-8 rounded-full bg-[var(--primary-color)] border-2 border-white/30 z-10 text-white flex items-center justify-center">
              {i + 1}
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-xl border border-white/10 ">
              <div className="flex items-center gap-4 mb-2">
                <Icon className="text-2xl text-[var(--primary-color)]" />
                <h3 className="text-lg font-semibold playfair">{step}</h3>
              </div>
              <p className="text-gray-300">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
