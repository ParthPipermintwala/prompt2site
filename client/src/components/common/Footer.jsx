import React from "react";
import { motion as Motion } from "motion/react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 max-md:px-0 text-center text-sm text-zinc-500 flex align-baseline pt-3 justify-between">
      <div className="max-md:text-[12px]">
        <Motion.p
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mb-1 text-zinc-400 max-md:px-1"
        >
          &copy; {new Date().getFullYear()} prompt2site. All rights reserved.
        </Motion.p>

        <Motion.p
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mb-4 text-zinc-500 max-md:px-1"
        >
          Made by Parth Pipermintwala
        </Motion.p>
      </div>

      <Motion.a
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.5 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        href="https://github.com/ParthPipermintwala/prompt2site"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-md:text-[12px] h-[5vh] max-md:h-[6vh] items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-blue-300 transition duration-300 ease-in-out hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200 max-md:px-2 max-md:py-1"
      >
        <FaGithub size={24} className="mr-2 max-md:mr-0"/>
         prompt2site GitHub
      </Motion.a>
    </footer>
  );
}
