import React from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#120f17] text-white">
      <AnimatePresence mode="wait">
        {" "}
        <Motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{y:-100,opacity:0}}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b-3 border-white/10"
        >
          <Motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{y:-200,opacity:0}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mx-auto px-3 h-16 flex items-center justify-between"
          >
            <div className="flex items-center gap-8">
              <button className="cursor-pointer rounded-lg hover:bg-white/10 transition p-1 hover:scale-110">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-lg font-semibold">DashBoard</h1>
            </div>
            <button className="px-2 py-1 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition"><span className="font-bold text-lg">+</span> New Website</button>
          </Motion.div>
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}
