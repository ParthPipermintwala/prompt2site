import React from "react";
import { motion as Motion } from "motion/react";
import Navbar from "@/components/Generate/Navbar";

export default function Generate() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16 max-md:py-10">
        <Motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold max-md:text-2xl mb-4 leading-tight">
            Build Website With
            <span className="block -mt-1 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Real AI Power
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto max-md:text-[12px]">
            This Process May Take Several Minutes.
            prompt2site focuses on quality, not shortcuts.
          </p>
        </Motion.div>
      </div>
    </div>
  );
}
