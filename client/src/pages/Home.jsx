import React from "react";
import { motion as Motion } from "motion/react";
export default function Home() {
  return (
    <div className="w-screen h-screen text-[#e1e8ea] hover:text-[#4FB8E6] transition duration-400 text-7xl">
      <Motion.div className="bg-black w-full h-[10vh] flex justify-between items-center px-10 max-md:px-3">
        <img src="/logo.svg" alt="logo" className="w-[15vw] max-md:w-[25vh]" />
      </Motion.div>
    </div>
  );
}
