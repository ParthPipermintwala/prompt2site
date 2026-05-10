import React from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "@/components/Dashboard/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#120f17] text-white">
      <AnimatePresence mode="wait">
        <Navbar />
      </AnimatePresence>
    </div>
  );
}
