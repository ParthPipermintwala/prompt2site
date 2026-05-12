import FuzzyText from "@/components/animation/FuzzyText";
import ErrorPage from "@/components/common/ErrorPage";
import Loader from "@/components/common/Loader";
import axios from "axios";
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

  if (!websiteData) {
    return <Loader message="Loading website data..." />;
  }

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

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      <aside>
        
      </aside>
    </div>
  );
}
