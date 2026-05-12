import FuzzyText from "@/components/animation/FuzzyText";
import Loader from "@/components/common/Loader";
import Chat from "@/components/Editor/Chat";
import Header from "@/components/Editor/Header";
import axios from "axios";
import { Code2Icon, Maximize2, Rocket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Editor() {
  const { id } = useParams();
  const [websiteData, setWebsiteData] = useState(null);
  const [error, setError] = useState("");
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
      <aside>
        <Header title={websiteData.title} />
        <Chat conversations={websiteData.conversations} />
      </aside>

      <div className="h-14 px-4 flex flex-1 justify-between items-center border-b border-white/10 bg-black/80">
        <span className="text-xs text-zinc-400">Live Preview</span>
        <button><Rocket size={14} className="inline"/> Deploy</button>
        <button><Code2Icon size={14}/></button>
        <button><Maximize2 size={14}/></button>
      </div>
    </div>
  );
}
