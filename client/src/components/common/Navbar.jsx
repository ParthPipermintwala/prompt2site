import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Navbar({ OpenLogin }) {
  return (
    <Motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-[8vh] flex justify-between items-center px-10 max-md:px-3 cursor-pointer"
    >
  
      <Link to="/">
        <Motion.img
          whileTap={{ scale: 0.7 }}
          src="/logo.svg"
          alt="logo"
          className="w-[18vw] max-md:w-[28vh]"
        />
      </Link>

      <div className="flex gap-10 max-md:gap-5 text-[2.5vh] max-md:hidden">
        <Motion.div whileTap={{ scale: 0.6 }}>
          <Link
            to="#pricing"
            className="text-[#e1e8ea] hover:text-[#13b6f6d9] transition duration-300"
          >
            Pricing
          </Link>
        </Motion.div>
        <Motion.div whileTap={{ scale: 0.6 }}>
          <div
            
            className="text-[#e1e8ea] hover:text-[#13b6f6d9] transition duration-300"
            onClick={OpenLogin}
          >
            Get Started
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
}
