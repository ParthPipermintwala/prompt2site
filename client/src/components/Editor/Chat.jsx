import React, { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import { Copy, CopyCheck, Send } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/features/user/userSlice";

export default function Chat({
  conversations = [],
  id,
  setWebsiteData,
  setFetching,
  fetching,
  setPrompt,
  prompt,
}) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [copiedId, setCopiedId] = useState(null);
  const errorRef = useRef("");
  const chatRef = useRef(null);
  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const handleSend = async () => {
    try {
      setFetching(true);
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/website/changeWebsite/${id}`,
        { prompt },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userData, credits: result.data.creditsLeft }),
      );
      setFetching(false);
      setPrompt("");
      setWebsiteData((pre) => ({
        ...pre,
        conversations: [...conversations, ...result.data.conversations],
        latestCode: result.data.latestCode,
      }));
    } catch (e) {
      setFetching(false);
      errorRef.current.innerText = "* " + e?.response?.data?.message;
      setTimeout(() => {
        errorRef.current.innerText = "";
      }, 3000);
    }
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [conversations, fetching]);

  return (
    <>
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
        ref={chatRef}
        className="flex-1 overflow-y-auto px-2 py-4 space-y-4 select-text bg-[#080808]"
      >
        {conversations.map((conversation, index) => (
          <Motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80, transition: { duration: 0, delay: 0 } }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`cursor-text group max-w-[80%] flex gap-1.5 ${conversation.role === "user" ? "justify-end ml-auto" : "justify-start mr-auto ml-2"}`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: conversation.content,
              }}
              className={`px-2 py-1.5 rounded-2xl text-sm ${conversation.role === "user" ? "bg-[#363636] text-zinc-300 border border-zinc-600" : "border border-white/20 bg-[#2c2626] text-zinc-200 text-left"}`}
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
        {fetching && (
          <Motion.div
            initial={{ opacity: 0, y: 50, scale: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="max-w-[50%] max-md:max-w-[60%] px-3 py-3 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center gap-3 z-50"
          >
            <div className="flex gap-1 ">
              <Motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0,
                }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />

              <Motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0.15,
                }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />

              <Motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0.3,
                }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>

            <Motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className=" text-sm font-medium text-white tracking-wide"
            >
              Updating Website...
            </Motion.p>
          </Motion.div>
        )}
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60, transition: { duration: 0, delay: 0 } }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
        className="p-3 border-t border-white/10 "
      >
        <div className="flex gap-2 items-center justify-between">
          <textarea
            rows="1"
            placeholder="Describe Changes..."
            value={prompt}
            readOnly={fetching}
            onChange={(e) => setPrompt(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";

              const maxHeight = 24 * 9; // line-height * max rows

              e.target.style.height =
                Math.min(e.target.scrollHeight, maxHeight) + "px";
            }}
            className={`${fetching ? "cursor-not-allowed opacity-50" : "cursor-text opacity-100"} hide-scrollbar flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:ring-[1px] focus:ring-blue-400`}
          ></textarea>
          <button
            onClick={handleSend}
            disabled={fetching}
            className={`${fetching ? "cursor-not-allowed opacity-70" : "cursor-pointer"} mt-1 px-2 py-2 rounded-2xl bg-white text-black  transition duration-200 hover:scale-105`}
          >
            <Send />
          </button>
        </div>
        <Motion.div
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
          ref={errorRef}
          className="ml-2 mt-1 text-xs text-red-500 "
        ></Motion.div>
      </Motion.div>
    </>
  );
}
