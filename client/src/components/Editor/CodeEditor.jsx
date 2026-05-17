import React from "react";
import { motion as Motion } from "motion/react";
import Editor from "@monaco-editor/react";
import { X } from "lucide-react";
import Loader from "../common/Loader";

export default function CodeEditor({ setShowCode, code, setCode }) {
  return (
    <Motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-y-0 left-0 w-full lg:w-[38%] z-[9999]  flex flex-col"
    >
      <Motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
        className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#0b0a0a]"
      >
        <span className="text-zinc-300">index.html</span>
        <Motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => setShowCode(false)}
          className="cursor-pointer"
        >
          <X size={22} />
        </Motion.button>
      </Motion.div>
      <Editor
        theme="vs-dark"
        value={code}
        language="html"
        loading={<Loader message="Loading Code ..." />}
        onChange={(val) => setCode(val)}
      />
    </Motion.div>
  );
}
