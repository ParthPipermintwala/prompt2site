import React from "react";
import { motion as Motion } from "motion/react";
import { SidebarClose } from "lucide-react";

export default function Header({
  title = "Editor",
  setChatVisible = null,
  setChatVisibleBigScreen = null,
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.1, delay: 0 } }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      className="h-14 px-4 flex items-center justify-between border-b border-white/10"
    >
      <span className="font-semibold truncate">{title}</span>
      <Motion.button
        whileTap={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        className="cursor-pointer"
        onClick={() => {
          if (setChatVisible) setChatVisible(false);
          if (setChatVisibleBigScreen) setChatVisibleBigScreen(false);
        }}
      >
        <SidebarClose />
      </Motion.button>
    </Motion.div>
  );
}
