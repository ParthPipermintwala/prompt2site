import React, { useState } from "react";
import { motion as Motion } from "motion/react";
import { Copy, CopyCheck, Send } from "lucide-react";

export default function Chat({ conversations = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };
  return (
    <>
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
        className="flex-1 overflow-y-auto px-2 py-4 space-y-4 select-text bg-[#080808]"
      >
        {conversations.map((conversation, index) => (
          <Motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80, transition: { duration: 0, delay: 0 } }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
            className={`cursor-text group max-w-[80%] flex gap-1 ${conversation.role === "user" ? "justify-end ml-auto" : "justify-start mr-auto ml-2"}`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: conversation.content,
              }}
              className={`px-3 pl-4 py-1.5 rounded-2xl text-sm ${conversation.role === "user" ? "bg-[#363636] text-zinc-300 text-right border border-zinc-600" : "border border-white/20 bg-[#2c2626] text-zinc-200 text-left"}`}
            />
            <Motion.button
              whileTap={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer max-lg:opacity-100"
              onClick={() => handleCopy(index, conversation.content)}
            >
              {copiedId === index ? (
                <CopyCheck size={14} className="text-white" />
              ) : (
                <Copy size={14} className="text-zinc-400 hover:text-zinc-300" />
              )}
            </Motion.button>
          </Motion.div>
        ))}

      </Motion.div>
        <Motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60, transition: { duration: 0, delay: 0 } }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
         className="p-3 border-t border-white/10 ">
          <div className="flex gap-2 items-center justify-between">
            <textarea
              rows="1"
              placeholder="Describe Changes..."
              className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:ring-[1px] focus:ring-blue-400"
            ></textarea>
            <button className="mt-1 px-2 py-2 rounded-2xl bg-white text-black cursor-pointer transition duration-200 hover:scale-105">
              <Send />
            </button>
          </div>
        </Motion.div>
    </>
  );
}
