import React from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useSelector } from "react-redux";
import Navbar from "@/components/Dashboard/Navbar";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";

export default function Dashboard() {
  useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-[#120f17] text-white">
      <AnimatePresence mode="wait">
        <Navbar />
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mb-10"
        >
          <p className="text-sm text-zinc-400 mb-1">Welcome To Prompt2site</p>
          <h1 className="text-3xl font-bold">{userData?.name}</h1>
        </Motion.div>
      </div>
    </div>
  );
}
