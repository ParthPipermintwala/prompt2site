import React from "react";
import { motion as Motion } from "motion/react";
import { Code2Icon, Maximize2, MessageSquarePlus, Rocket } from "lucide-react";

export default function PreviewHeader({
  setShowCode,
  setChatVisible,
  setChatVisibleBigScreen,
  chatVisibleBigScreen,
  chatVisible,
  setShowFullPreview,
  ShowCode,
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80"
    >
      <div className="flex items-center gap-4">
        <Motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className={`${chatVisibleBigScreen ? "min-lg:hidden" : "min-lg:block"} cursor-pointer `}
          onClick={() => {
            setChatVisible(!chatVisible);
            setChatVisibleBigScreen(!chatVisibleBigScreen);
          }}
        >
          <MessageSquarePlus />
        </Motion.button>
        <span className="text-sm text-zinc-300">Live Preview</span>
      </div>
      <div className="flex items-center gap-2 max-md:gap-1">
        <Motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer flex items-center gap-2 max-md:px-2  max-md:gap-1 px-4 py-1 rounded-lg bg-linear-to-r from-indigo-800 to-purple-600 text-[16px] hover:from-indigo-700 hover:to-purple-600 transition-colors duration-300 hover:scale-102 hover:shadow-lg hover:border-purple-500/50"
        >
          <Rocket size={15} /> Deploy
        </Motion.button>
        <Motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer p-2"
          onClick={() => {
            setShowCode(!ShowCode);
          }}
        >
          <Code2Icon size={18} />
        </Motion.button>
        <Motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer"
          onClick={() => setShowFullPreview(true)}
        >
          <Maximize2 size={18} />
        </Motion.button>
      </div>
    </Motion.div>
  );
}
