import React, { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useSelector } from "react-redux";
import Navbar from "@/components/Dashboard/Navbar";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import axios from "axios";
import FuzzyText from "@/components/animation/FuzzyText";
import { Rocket, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  useGetCurrentUser();
  const navigate = useNavigate();
  const [Websites, setWebsites] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useSelector((state) => state.user);

  const handleDeploy = async (id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/website/deploy/${id}`,
        {
          withCredentials: true,
        },
      );
      console.log(result.data.deployeUrl)
      window.open(`${result.data.deployeUrl}`, "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleGetAllWebsite = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/website/getAll`,
          {
            withCredentials: true,
          },
        );
        console.log(result.data);
        setWebsites(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error?.message || "Something went wrong");
      }
    };
    handleGetAllWebsite();
  }, []);

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
    <div className="min-h-screen bg-[#120f17] text-white">
      <AnimatePresence mode="wait">
        <Navbar />
      </AnimatePresence>
      <div className="max-w-7xl mx-auto lg:w-7xl px-6 py-10 flex-1">
        <Motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mb-10"
        >
          <p className="text-sm text-zinc-400 mb-1">Welcome To Prompt2site</p>
          <h1 className="text-3xl font-bold">{userData?.name}</h1>
        </Motion.div>

        {loading && (
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-lg font-medium text-white justify-center w-full mx-auto h-[50vh]"
          >
            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />

            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Loading Your Websites...
            </span>
          </Motion.div>
        )}

        {!loading && Websites?.length == 0 && (
          <div className="mt-25 text-center text-zinc-400 ">
            You have no websites
          </div>
        )}

        {!loading && Websites?.length > 0 && (
          <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-8">
            {Websites.map((w, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                  delay: index * 0.001,
                }}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col "
              >
                <div
                  onClick={() => navigate(`/editor/${w._id}`)}
                  className="relative h-[160px] bg-black cursor-pointer overflow-hidden"
                >
                  <iframe
                    srcDoc={w.latestCode}
                    className="absolute inset-0  scale-[0.72] origin-top-left pointer-event-none bg-black w-[140%] h-[140%] cursor-pointer overflow-hidden"
                  />
                  <div className="absolute inset-0 bg-black/30 h-[140%]" />
                </div>
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <h4 className="text-base font-semibold line-clamp-2">
                    {w.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mb-3">
                    Last Updated {""}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>
                  {!w.deployed ? (
                    <button
                      onClick={() => handleDeploy(w._id)}
                      className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-102 transition duration-200 cursor-pointer mx-3"
                    >
                      <Rocket size={14} /> Deploy
                    </button>
                  ) : (
                    <button className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-102 transition duration-200 cursor-pointer mx-3">
                      <Share2 size={14} /> Share Link
                    </button>
                  )}
                </div>
              </Motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
