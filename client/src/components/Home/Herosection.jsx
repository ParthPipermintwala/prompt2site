import React from "react";
import { motion as Motion } from "motion/react";

export default function Herosection({OpenLogin}) {
  return (
    <section className="pt-[30vh] pb-32 px-6 text-center">
      <Motion.h1
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-[8vh] max-md:text-[5vh] font-bold text-[#e1e8ea]  tracking-tight mb-0"
      >
        Building Stunning Websites
      </Motion.h1>
      <Motion.h1
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        className=" animate-gradient bg-[linear-gradient(120deg,#645ee4_41%,#4F46E5_40%,#A855F7_60%)] bg-length-[100%] bg-clip-text text-transparent tracking-tight max-md:text-[6vh] max-md:mt-1 font-bold"
      >
        With AI
      </Motion.h1>

      <Motion.p
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "linear", delay: 0.2 }}
        className="text-[1.7vh] max-w-2xl max-md:max-w-xl text-[#a0a0a0] mt-5 mx-auto max-md:text-[2.1vh]"
      >
        Transform your ideas into reality with the power of artificial
        intelligence. Our AI-driven website builder creates websites in minutes.
        No coding required.
      </Motion.p>

      <Motion.button
        initial={{ x: 2000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        onClick={OpenLogin}
        className="cursor-pointer mt-10 w-[13vw] h-[4vw] max-md:w-[18vh] max-md:h-[6vh] max-lg:w-[20vh] max-lg:h-[7vh] px-2 py-2 font-bold rounded-2xl max-md:rounded-xl text-[3vh] max-md:text-[2.6vh] bg-[#b3d2d6] text-black transition-all duration-300 ease-in-out hover:bg-linear-to-r hover:from-[#00F5FF] hover:via-[#3B82F6] hover:to-[#8B5CF6] hover:shadow-lg hover:shadow-blue-900/30 hover:scale-102 hover:border-3 hover:border-[#00F5FF]"
      >
        Get Started
      </Motion.button>
    </section>
  );
}
