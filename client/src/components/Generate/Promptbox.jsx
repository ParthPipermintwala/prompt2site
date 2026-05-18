import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { motion as Motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Promptbox() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { userData } = useSelector((state) => state.user);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [randomText, setRandomText] = useState("Generating...");
  const [seconds, setSeconds] = useState(0);
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
    var interval;
    setLoading(true);
    try {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/website/generate`,
        { prompt },
        {
          withCredentials: true,
        },
      );
      if (result.status === 200) {
        console.log(result.data);
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, credits: result.data.creditsLeft }),
        );
        navigate(`/editor/${result.data.websiteId}`)
      }
    } catch (error) { 
      setError(error.response.data.message||"Something went wrong")
      setTimeout(()=>{
        setError("")
      },3000)
      console.error("Error generating website:", error);
    } finally {
      setLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <>
      <div className="relative">
      {seconds}
        <Motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
          placeholder="Describe your website in detail..."
          readOnly={loading}
          className={`w-full h-35 max-md:h-24 p-4 rounded-2xl overflow-y-scroll hide-scrollbar bg-[#0c0a0f] border border-white/10 outline-none resize-none text-[16px] leading-relaxed focus:ring-1 focus:ring-white/30 ${
            loading ? "cursor-not-allowed " : "cursor-text"
          }`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></Motion.textarea>
        {
          Error && (
            <Motion.div 
            initial={{y:80,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:0.2,ease:"easeInOut"}}
            className="text-red-500 text-sm ml-2">* {" "}{Error}</Motion.div>
          )
        }
      </div>
      <Motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
        className="flex justify-center mt-6 transition"
      >
        <Motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          className={`px-5 py-2 rounded-2xl font-semibold bg-white text-black text-lg ${loading ? "cursor-not-allowed  bg-white/80 " : "cursor-pointer"}`}
          onClick={handlegenerate}
        >
          {loading ? randomText : "Generate Website"}
        </Motion.button>
      </Motion.div>
    </>
  );
}
