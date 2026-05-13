import React from "react";
import { motion as Motion } from "motion/react";

export default function Chat({ conversations = [] }) {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
      transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
      className="flex-1 overflow-y-auto px-2 py-4 space-y-4 "
    >
      {conversations.map((conversation, index) => (
        <Motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.1, delay: 0 } }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
          className={`max-w-[80%] flex ${conversation.role === "user" ? "justify-end ml-auto" : "justify-start mr-auto"}`}
        >
          <div
            className={`px-3 py-1.5 rounded-2xl text-sm  leading-relaxed ${conversation.role === "user" ? "bg-[#363636] text-zinc-300 text-right border border-zinc-600" : "border border-white/20 bg-[#2c2626] text-zinc-200 text-left"}`}
          >
            {conversation.content}
          </div>
        </Motion.div>
      ))}
    </Motion.div>
  );
}
