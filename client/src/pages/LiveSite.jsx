import FuzzyText from "@/components/animation/FuzzyText";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LiveSite() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/website/getBySlug/${id}`,
        );
        setCode(result.data.latestCode);
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

  return (
    <div>
      <iframe srcDoc={code} title="Live Site" className="w-screen h-screen border-none" sandbox="allow-scripts allow-same-origin allow-forms" />
    </div>
  );
}
