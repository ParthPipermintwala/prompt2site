import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { AnimatePresence } from "framer-motion";
import FuzzyText from "@/components/animation/FuzzyText";
import Loader from "@/components/common/Loader";
import Chat from "@/components/Editor/Chat";
import Header from "@/components/Editor/Header";
import PreviewHeader from "@/components/Editor/PreviewHeader";
import CodeEditor from "@/components/Editor/CodeEditor";
import { Minimize2 } from "lucide-react";

export default function Editor() {
  const { id } = useParams();
  const iframeRef = useRef(null);
  const [websiteData, setWebsiteData] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatVisibleBigScreen, setChatVisibleBigScreen] = useState(true);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [fetching, setFetching] = useState(false);
  const [ShowCode, setShowCode] = useState(false);
  const [ShowFullPreview, setShowFullPreview] = useState(false);
  const [code, setCode] = useState(websiteData?.latestCode);
  const [deployUrl, setdeployUrl] = useState(null);

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.PROD ? "" : import.meta.env.VITE_BACKEND_URL || ""}/api/website/websiteData/${id}`,
          {
            withCredentials: true,
          },
        );
        setWebsiteData(result.data);
        setdeployUrl(result.data.deployeUrl)
        setCode(result.data.latestCode)
      } catch (error) {
        console.error("Error fetching website data:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching website data.",
        );
      }
    };

    handleGetWebsite();
  }, [id]);

  useEffect(() => {
    if (!code) return;
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [code]);

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
            className={`${chatVisible ? "flex flex-col  max-lg:w-screen min-lg:w-[30%]" : "max-lg:hidden"} ${chatVisibleBigScreen ? "min-lg:flex min-lg:flex-col min-lg:max-w-[35%]" : "min-lg:hidden"} border border-white/20 rounded-lg overflow-hidden`}
          >
            <Header
              title={websiteData.title}
              setChatVisible={setChatVisible}
              setChatVisibleBigScreen={setChatVisibleBigScreen}
            />
            <Chat
              conversations={websiteData.conversations}
              id={id}
              setWebsiteData={setWebsiteData}
              setPrompt={setPrompt}
              setCode={setCode}
              prompt={prompt}
              fetching={fetching}
              setFetching={setFetching}
            />
          </Motion.aside>
        ) : null}
      </AnimatePresence>

      <div
        className={`hide-scrollbar flex-1 flex flex-col border border-white/20 rounded-lg overflow-hidden max-lg:border-0 ${chatVisible ? "max-lg:hidden" : ""}`}
      >
        <PreviewHeader
          setShowCode={setShowCode}
          setChatVisibleBigScreen={setChatVisibleBigScreen}
          chatVisibleBigScreen={chatVisibleBigScreen}
          setChatVisible={setChatVisible}
          chatVisible={chatVisible}
          setShowFullPreview={setShowFullPreview}
          ShowCode={ShowCode}
          id={websiteData._id}
          deployUrl={deployUrl}
          setdeployUrl={setdeployUrl}
        />
        <iframe ref={iframeRef} className="flex-1 w-full bg-white/3 " sandbox="allow-scripts allow-same-origin allow-forms"/>
      </div>

      <AnimatePresence mode="wait">
        {ShowCode && (
          <CodeEditor
            setShowCode={setShowCode}
            setWebsiteData={setWebsiteData}
            code={code}
            setCode={setCode}
          />
        )}
      </AnimatePresence>

      {ShowFullPreview && (
        <AnimatePresence mode="wait">
          <Motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-black"
          >
            <iframe srcDoc={code} className="w-full bg-white/3 h-full" sandbox="allow-scripts allow-same-origin allow-forms"/>
            <Motion.button
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
              onClick={() => setShowFullPreview(false)}
              className="absolute top-0 left-0 p-1 bg-black/90 rounded-lg hover:scale-110 duration-200 cursor-pointer"
            >
              <Minimize2 size="22" />
            </Motion.button>
          </Motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
