import React from "react";
import { motion as Motion } from "motion/react";
import Navbar from "@/components/Home/Navbar";

export default function Home() {
  const highLights = [
    "AI Genrated Code",
    "Fully Responsive Layout",
    "Production Reday Output",
  ];
  return (
    <div className="max-w-screen max-h-screen overflow-x-hidden transition duration-400 text-7xl">
      <Navbar />

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
          className=" animate-gradient bg-[linear-gradient(90deg,#1540b7_0%,#4F46E5_40%,#A855F7_100%)] bg-[length:300%_100%] bg-clip-text text-transparent tracking-tight max-md:text-[6vh] max-md:mt-1 font-bold"
        >
          With AI
        </Motion.h1>

        <Motion.p
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "linear", delay: 0.2 }}
          className="text-[1.7vh] max-w-2xl max-md:max-w-xl text-[#a0a0a0] mt-5 mx-auto"
        >
          Transform your ideas into reality with the power of artificial
          intelligence. Our AI-driven website builder creates websites in
          minutes. No coding required.
        </Motion.p>

        <Motion.button
          initial={{ x: 2000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
          className="mt-10 w-[13vw] h-[4vw] max-md:w-[18vh] max-md:h-[6vh] px-2 py-2 font-bold rounded-2xl max-md:rounded-xl text-[3vh] max-md:text-[2.6vh] bg-[#b3d2d6] text-black transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#00F5FF] hover:via-[#3B82F6] hover:to-[#8B5CF6] hover:shadow-lg hover:shadow-blue-900/30 hover:scale-102 hover:border-3 hover:border-[#00F5FF]"
        >
          Get Started
        </Motion.button>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid  max-md:grid-cols-1 grid-cols-3 gap-10 max-md:gap-3">
          {highLights.map((item, index) => {
            return (
              <Motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="rounded-2xl bg-white/8 border border-white/10 p-8 mb-5"
              >
                <h1 className="text-xl font-semibold mb-3">{item}</h1>
                <p className="text-sm text-zinc-400">
                  prompt2site builds real websites - clean code, animation ,
                  responsive design and scalable structure{" "}
                </p>
              </Motion.div>
            );
          })}
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 max-md:px-1 text-center text-sm text-zinc-500 flex align-baseline pt-3 justify-between">
        <div className="max-md:text[2px]">
          <p className="mb-2 text-zinc-400 max-md:px-0">
            &copy; 2026 prompt2site. All rights reserved.
          </p>

          <p className="mb-4 text-zinc-500 max-md:px-0">Made by Parth Pipermintwala</p>
        </div>

        <a
          href="https://github.com/ParthPipermintwala/prompt2site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-md:text[2px] h-[50px] items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-blue-300 transition duration-300 ease-in-out hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200 max-md:px-2 max-md:py-1"
        >
          prompt2site GitHub
        </a>
      </footer>
    </div>
  );
}
