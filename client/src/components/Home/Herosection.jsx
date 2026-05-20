import React from "react";
import { motion as Motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogIn, Plus, Wallet } from "lucide-react";

export default function Herosection({ OpenLogin }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  return (
    <section className="pt-[30vh] pb-32 px-6 max-md:px-2 text-center">
      <Motion.h1
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-[8vh] max-md:text-[4vh] font-bold text-[#e1e8ea]  tracking-tight mb-0"
      >
        Building Stunning Websites
      </Motion.h1>
      <Motion.h1
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
        className=" animate-gradient bg-[linear-gradient(120deg,#645ee4_41%,#4F46E5_40%,#A855F7_60%)] bg-length-[100%] bg-clip-text text-transparent tracking-tight max-md:text-[5vh] max-md:mt-1 font-bold"
      >
        With AI
      </Motion.h1>

      <Motion.p
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "linear", delay: 0.1 }}
        className="text-[1.7vh] leading-5 max-w-2xl max-md:max-w-xl text-[#a0a0a0] mt-5 mx-auto max-md:text-[2.1vh]"
      >
        Transform your ideas into reality with the power of artificial
        intelligence. Our AI-driven website builder creates websites in minutes.
        No coding required.
      </Motion.p>

      <div className="flex items-center gap-5 justify-center">
        <Motion.button
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileTap={{ scale: 0.8, transition: { duration: 0 } }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
          onClick={() => {
            if (!userData) OpenLogin();
            else navigate("/generate");
          }}
          className=" text-xl max-xl:text-lg cursor-pointer w-[12vw] max-xl:w-[23vh] h-[3vw] max-xl:h-[6vh] mt-10 px-1 py-1  rounded-2xl max-md:rounded-xl  bg-linear-to-r from-indigo-600 to-purple-700 text-[#f4f4f9] transition-all duration-300 hover:brightness-110 hover:scale-101"
        >
          {userData ? (
            <div className="flex justify-center items-center gap-1">
              <Plus />
              Start Building
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <LogIn size={20} />
              Get Started
            </div>
          )}
        </Motion.button>
        {!userData ? (
          <Motion.button
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileTap={{ scale: 0.8, transition: { duration: 0 } }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 }}
            onClick={() => {
              navigate("/pricing");
            }}
            className={`md:hidden flex justify-center items-center gap-2 text-xl max-xl:text-lg cursor-pointer w-[10vw] max-xl:w-[18vh]  h-[3vw] max-xl:h-[6vh] mt-10 px-1 py-1  rounded-2xl max-md:rounded-xl  bg-linear-to-r from-indigo-600 to-purple-700 text-[#f4f4f9] transition-all duration-300 hover:brightness-110 hover:scale-101`}
          >
            <Wallet />
            Pricing
          </Motion.button>
        ) : (
          <Motion.button
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileTap={{ scale: 0.8, transition: { duration: 0 } }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 }}
            onClick={() => {
              navigate("/dashboard");
            }}
            className="flex justify-center items-center gap-2 text-xl max-xl:text-lg cursor-pointer w-[10vw] max-xl:w-[20vh] h-[3vw] max-xl:h-[6vh] mt-10 px-1 py-1  rounded-2xl max-md:rounded-xl  bg-linear-to-r from-indigo-600 to-purple-700 text-[#f4f4f9] transition-all duration-300 hover:brightness-110 hover:scale-101"
          >
            <LayoutDashboard />
            Dashboard
          </Motion.button>
        )}
      </div>
    </section>
  );
}
