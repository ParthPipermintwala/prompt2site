import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { motion as Motion } from "motion/react";

export default function Promptbox() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomText, setRandomText] = useState("Generating...");
  const buttonText = [
    "Generating...",
    "please wait...",
    "This may take a while...",
    "Almost there...",
    "Just a moment...",
  ];
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setRandomText(buttonText[Math.floor(Math.random() * buttonText.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading]);
  const handlegenerate = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/website/generate`,
        { prompt },
        {
          withCredentials: true,
        },
      );
      console.log(result.data)
    } catch (error) {
        if(error.status === 403){
            alert("You don't have enough credits to generate a website. Please purchase more credits to continue.");
            setLoading(false);
            return;
        }
      console.error("Error generating website:", error);
    }
  };

  return (
    <>
      <div className="relative">
        <Motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
          placeholder="Describe your website in detail..."
          readOnly={loading}
          className={`w-full h-35 max-md:h-24 p-4 mb-5 rounded-2xl overflow-y-scroll hide-scrollbar bg-[#0c0a0f] border border-white/10 outline-none resize-none text-[16px] leading-relaxed focus:ring-1 focus:ring-white/30 ${
            loading ? "cursor-not-allowed " : "cursor-text"
          }`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></Motion.textarea>
      </div>
      <Motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
        className="flex justify-center"
      >
        <Motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          className={`px-5 py-2 rounded-2xl font-semibold bg-white text-black text-lg ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={handlegenerate}
        >
          {loading ? randomText : "Generate Website"}
        </Motion.button>
      </Motion.div>
    </>
  );
}
