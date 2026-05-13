import React, { useState } from "react";
import { motion as Motion } from "motion/react";
import { Copy, CopyCheck } from "lucide-react";

export default function Chat({ conversations = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = (id,content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  }
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
      transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
      className="flex-1 overflow-y-auto px-2 py-4 space-y-4 "
    >
      {conversations.map((conversation, index) => (
        <Motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0, delay: 0 } }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
          className={`group max-w-[80%] flex gap-2 ${conversation.role === "user" ? "justify-end ml-auto" : "justify-start mr-auto"}`}
        >
          <div
            className={` px-3 py-1.5 rounded-2xl text-sm  leading-relaxed ${conversation.role === "user" ? "bg-[#363636] text-zinc-300 text-right border border-zinc-600" : "border border-white/20 bg-[#2c2626] text-zinc-200 text-left"}`}
          >
            {conversation.content}
          </div>
          <Motion.button
            whileTap={{scale:0.7}}
            animate={{scale:1}}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            onClick={()=>handleCopy(index,conversation.content)}
            >
              {copiedId === index ? <CopyCheck size={16} className="text-white"/> : <Copy size={16}  className="text-zinc-400 hover:text-zinc-300"/>}
          </Motion.button>
        </Motion.div>
      ))}
    </Motion.div>
  );
}
