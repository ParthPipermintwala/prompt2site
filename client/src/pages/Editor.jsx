import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FuzzyText from "@/components/animation/FuzzyText";
import Loader from "@/components/common/Loader";
import Chat from "@/components/Editor/Chat";
import Header from "@/components/Editor/Header";
import axios from "axios";
import { Code2Icon, Maximize2, Rocket } from "lucide-react";

export default function Editor() {
  const { id } = useParams();
  const [websiteData, setWebsiteData] = useState(null);
  const [error, setError] = useState("");
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleGetWebsite = async () => {
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

  console.log(websiteData);
  return (
    <div className="h-screen w-screen flex gap-2 bg-black text-white overflow-hidden">
      <aside className="max-lg:hidden">
        <Header title={websiteData.title} />
        <Chat conversations={websiteData.conversations} />
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-sm text-zinc-400">Live Preview</span>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-1 rounded-lg bg-linear-to-r from-indigo-600 to-purple-500 text-[16px] hover:from-indigo-700 hover:to-purple-600 transition-colors duration-300 hover:scale-102">
              <Rocket size={15} /> Deploy
            </button>
            <button className="p-2">
              <Code2Icon size={18} />
            </button>
            <button>
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
        <iframe ref={iframeRef} className="flex-1 w-full bg-white/3" />
      </div>
    </div>
  );
}
