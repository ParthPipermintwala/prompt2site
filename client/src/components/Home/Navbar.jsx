import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-[8vh] flex justify-between items-center px-10 max-md:px-3 cursor-pointer"
    >
      <img src="/logo.svg" alt="logo" className="w-[18vw] max-md:w-[28vh]" />
      <div className="flex gap-10 max-md:gap-5 text-[2.5vh] max-md:hidden">
        <Link
          to="#pricing"
          className="text-[#e1e8ea] hover:text-[#13b6f6d9] transition duration-400"
        >
          Pricing
        </Link>
        <Link
          to="#services"
          className="text-[#e1e8ea] hover:text-[#13b6f6d9] transition duration-400"
        >
          Get Started
        </Link>
        <Link
          to="#contact"
          className="text-[#e1e8ea] hover:text-[#13b6f6d9] transition duration-400"
        >
          Contact
        </Link>
      </div>
    </Motion.div>
  );
}
