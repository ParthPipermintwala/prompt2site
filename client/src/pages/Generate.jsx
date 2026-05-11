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
          transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold max-md:text-2xl mb-4 leading-tight">
            Build Website With
            <span className="block -mt-1 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Real AI Power
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto max-md:text-[12px]">
            This Process May Take Several Minutes. prompt2site focuses on
            quality, not shortcuts.
          </p>
        </Motion.div>
        <div className="mb-14">
          <Motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
            className="text-xl ml-2 font-semibold mb-3"
          >
            Describe Your Website
          </Motion.h1>
          <div className="relative">
            <Motion.textarea
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
              name="website-description"
              id="website-description"
              placeholder="Describe your website in detail..."
              className="w-full h-35 max-md:h-24 p-4 mb-5 rounded-2xl overflow-y-scroll hide-scrollbar bg-[#0c0a0f] border border-white/10 outline-none resize-none text-[16px] leading-relaxed focus:ring-1 focus:ring-white/30 "
            ></Motion.textarea>
          </div>
          <Motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer px-5 py-2 rounded-2xl font-semibold bg-white text-black text-lg"
            >
              Generate Website
            </Motion.button>
          </Motion.div>
        </div>
      </div>
    </div>
  );
}
