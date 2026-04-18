import React from "react";
import { motion as Motion } from "motion/react";

export default function Navbar() {
  return (
    <Motion.div className="bg-black w-full h-[10vh] flex justify-between items-center px-10 max-md:px-3">
      <img src="/logo.svg" alt="logo" className="w-[15vw] max-md:w-[25vh]" />
    </Motion.div>
  );
}
