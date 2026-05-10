import React from "react";
import { motion as Motion } from "motion/react";
import { useSelector } from "react-redux";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function Profile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { handleLogout } = useAuth();

  return (
    <Motion.div
      initial={{ opacity: 0, y: -100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0, x: 100, scale: 0.5 }}
      className="absolute right-1 mt-3 max-md:w-60 w-70 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-white/10">
        <Motion.p
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut",delay: 0.2 }}
          className="text-lg font-medium truncate tracking-tight max-md:text-sm"
        >
          {userData.name}
        </Motion.p>
        <Motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut",delay: 0.15 }}
          className="text-sm text-zinc-400 truncate max-md:text-xs"
        >
          {userData.email}
        </Motion.p>
      </div>
      <div className="flex flex-col gap-0">
        <Motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
          className="cursor-pointer w-full text-left px-4 py-2 hover:bg-white/5 max-md:text-sm text-lg"
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard size={16} className="inline block mr-1" />
          Dashboard
        </Motion.button>
        <Motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.15 }}
          className="cursor-pointer w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 max-md:text-sm text-lg"
          onClick={handleLogout}
        >
          <LogOut size={16} className="inline block mr-1" />
          Logout
        </Motion.button>
      </div>
    </Motion.div>
  );
}
