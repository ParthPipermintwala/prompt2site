import React from "react";
import { motion as Motion } from "motion/react";
import { Code2Icon, Maximize2, MessageSquarePlus, Rocket } from "lucide-react";

export default function PreviewHeader({
  setShowCode,
  setChatVisible,
  setChatVisibleBigScreen,
  chatVisibleBigScreen,
  chatVisible,
  setShowFullPreview
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80"
    >
      <div className="flex items-center gap-4">
        <button
          className={`${chatVisibleBigScreen ? "min-lg:hidden" : "min-lg:block"} cursor-pointer `}
          onClick={() => {
            setChatVisible(!chatVisible);
            setChatVisibleBigScreen(!chatVisibleBigScreen);
          }}
        >
          <MessageSquarePlus />
        </button>
        <span className="text-sm text-zinc-300">Live Preview</span>
      </div>
      <div className="flex items-center gap-2 max-md:gap-1">
        <button className="cursor-pointer flex items-center gap-2 max-md:px-2  max-md:gap-1 px-4 py-1 rounded-lg bg-linear-to-r from-indigo-800 to-purple-600 text-[16px] hover:from-indigo-700 hover:to-purple-600 transition-colors duration-300 hover:scale-102 hover:shadow-lg hover:border-purple-500/50">
          <Rocket size={15} /> Deploy
        </button>
        <button
          className="cursor-pointer p-2"
          onClick={() => {
            setShowCode(true);
          }}
        >
          <Code2Icon size={18} />
        </button>
        <button className="cursor-pointer" onClick={()=>setShowFullPreview(true)}>
          <Maximize2 size={18} />
        </button>
      </div>
    </Motion.div>
  );
}
