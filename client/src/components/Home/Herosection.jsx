import React from "react";
import { motion as Motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Herosection({ OpenLogin }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
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
        onClick={() => {
          if (!userData) OpenLogin();
          else navigate("/generate");
        }}
        className={`cursor-pointer h-[3.5vw] max-xl:h-[7vh] max-xl:text-[3vh]  mt-10 ${userData ? "w-[17vw] max-xl:w-[32vh] text-2xl" : "w-[13vw] text-3xl max-xl:w-[23vh]"} px-1 py-1 font-bold rounded-2xl max-md:rounded-xl  border-2 border-cyan-300/60 bg-gradient-to-r from-[#00F5FF] via-[#3B82F6] to-[#8B5CF6] text-[#1b155b] transition-all duration-300 hover:border-cyan-300 hover:brightness-110 hover:scale-101 hover:font-b`}
      >
        {userData ? "Create New Website" : "Get Started"}
      </Motion.button>
    </section>
  );
}
