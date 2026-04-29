import React from "react";
import { motion as Motion } from "motion/react";
import { useSelector } from "react-redux";
import { LayoutDashboard, LogOut } from "lucide-react";
import axios from "axios";

export default function Profile() {
  const { userData } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const baseurl = import.meta.env.VITE_BACKEND_URL;
       await axios.get(`${baseurl}/api/auth/logout`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: -100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      className="absolute right-1 mt-3 max-md:w-60 w-70 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-lg font-medium truncate tracking-tight max-md:text-sm">
          {userData.name}
        </p>
        <p className="text-sm text-zinc-400 truncate max-md:text-xs">
          {userData.email}
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <button className="w-full text-left px-4 py-2 hover:bg-white/5 max-md:text-sm text-lg">
          <LayoutDashboard size={16} className="inline block mr-1" />
          Dashboard
        </button>
        <button
          className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 max-md:text-sm text-lg"
          onClick={handleLogout}
        >
          <LogOut size={16} className="inline block mr-1" />
          Logout
        </button>
      </div>
    </Motion.div>
  );
}
