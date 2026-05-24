import React, { useState } from "react";
import { motion as Motion } from "motion/react";
import {
  Code2Icon,
  CopyCheckIcon,
  Maximize2,
  MessageSquarePlus,
  Rocket,
  Share2,
} from "lucide-react";
import axios from "axios";

export default function PreviewHeader({
  setShowCode,
  setChatVisible,
  setChatVisibleBigScreen,
  chatVisibleBigScreen,
  chatVisible,
  setShowFullPreview,
  ShowCode,
  id,
  deployUrl,
  setdeployUrl,
}) {
  const [copied, setcopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(deployUrl);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  };
  const handleDeploy = async (id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.PROD ? "" : import.meta.env.VITE_BACKEND_URL || ""}/api/website/deploy/${id}`,
        {
          withCredentials: true,
        },
      );
      setdeployUrl(result.data.deployeUrl);
      window.open(`${result.data.deployeUrl}`, "_blank");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(deployUrl);
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
        {!deployUrl ? (
          <Motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleDeploy(id)}
            className="cursor-pointer flex items-center gap-2 max-md:px-2  max-md:gap-1 px-4 py-1 rounded-lg bg-linear-to-r from-indigo-800 to-purple-600 text-[16px] hover:from-indigo-700 hover:to-purple-600 transition-colors duration-300 hover:scale-102 hover:shadow-lg hover:border-purple-500/50"
          >
            <Rocket size={15} /> Deploy
          </Motion.button>
        ) : !copied ? (
          <Motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleCopy}
            className="cursor-pointer flex items-center gap-2 max-md:px-2  max-md:gap-1 px-4 py-1 rounded-lg bg-linear-to-r from-indigo-800 to-purple-600 text-[16px] hover:from-indigo-700 hover:to-purple-600 transition-colors duration-300 hover:scale-102 hover:shadow-lg hover:border-purple-500/50"
          >
            <Share2 size={15} /> Share Link
          </Motion.button>
        ) : (
          <Motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.8 }}
            className="cursor-pointer flex items-center gap-2 max-md:px-2  max-md:gap-1 px-4 py-1 rounded-lg  text-[16px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
          >
            <CopyCheckIcon size={15} />
            Link Copied
          </Motion.button>
        )}
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
