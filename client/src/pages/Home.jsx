import React from "react";
import { motion as Motion } from "motion/react";
import Navbar from "@/components/Home/Navbar";

export default function Home() {
  return (
    <div className="w-screen h-screen transition duration-400 text-7xl">
      <Navbar />

      <section className="pt-50 pb-32 px-6 text-center">
        <Motion.h1
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[8vh] max-md:text-[5vh] font-bold text-[#e1e8ea]  tracking-tight mb-0"
        >
          Building Stunning Websites
        </Motion.h1>
        <Motion.h1
          initial={{ x: -800, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
          className="bg-gradient-to-r from-[#00F5FF] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent tracking-tight max-md:text-[6vh] max-md:mt-2 font-bold"
        >
          With AI
        </Motion.h1>
      </section>
    </div>
  );
}
