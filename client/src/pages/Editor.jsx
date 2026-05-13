import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { AnimatePresence } from "framer-motion";
import { Code2Icon, Maximize2, MessageSquarePlus, Rocket } from "lucide-react";
import FuzzyText from "@/components/animation/FuzzyText";
import Loader from "@/components/common/Loader";
import Chat from "@/components/Editor/Chat";
import Header from "@/components/Editor/Header";

export default function Editor() {
  const { id } = useParams();
  const fetchedRef = useRef(false);
  const iframeRef = useRef(null);
  const [websiteData, setWebsiteData] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatVisibleBigScreen, setChatVisibleBigScreen] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleGetWebsite = async () => {
      if (fetchedRef.current || !id) return;
      fetchedRef.current = true;
      if(websiteData != null) return; 
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/website/websiteData/${id}`,
          {
            withCredentials: true,
          },
        );
        setWebsiteData(result.data);
      } catch (error) {
        console.error("Error fetching website data:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching website data.",
        );
      }

      return () => {
        console.log("EDITOR UNMOUNTED");
      };
    };

    handleGetWebsite();
  }, [id]);

  if (error) {
    return (
      <div className="max-w-screen h-screen flex justify-center items-center p-10 overflow-hidden">
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.3}
          enableHover
          fontSize={"4vw"}
        >
          {error}
        </FuzzyText>
      </div>
    );
  }

  if (!websiteData) {
    return <Loader message="Loading website data..." />;
  }

  return (
    <div className="h-screen w-screen gap-1.5 flex bg-black text-white overflow-hidden p-1 max-lg:p-0">
      <AnimatePresence mode="wait">
      {chatVisible || chatVisibleBigScreen ? (
        <Motion.aside
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.2, ease: "linear" }}
          className={`${chatVisible ? "block max-lg:w-screen min-lg:w-[30%]" : "max-lg:hidden"} ${chatVisibleBigScreen ? "min-lg:block" : "min-lg:hidden"} border border-white/20 rounded-lg overflow-hidden`}
        >
          <Header
            title={websiteData.title}
            setChatVisible={setChatVisible}
            setChatVisibleBigScreen={setChatVisibleBigScreen}
          />
          <Chat conversations={websiteData.conversations} />
        </Motion.aside>
      ) : null}
      </AnimatePresence>

      <div
        className={`flex-1 flex flex-col border border-white/20 rounded-lg overflow-hidden max-lg:border-0 ${chatVisible ? "max-lg:hidden" : ""}`}
      >
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
            <button className="cursor-pointer p-2">
              <Code2Icon size={18} />
            </button>
            <button className="cursor-pointer">
              <Maximize2 size={18} />
            </button>
          </div>
        </Motion.div>
        <iframe ref={iframeRef} className="flex-1 w-full bg-white/3" />
      </div>
    </div>
  );
}
