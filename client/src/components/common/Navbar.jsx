import React, { useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CoinsIcon, LogInIcon } from "lucide-react";
import Profile from "./Profile";

export default function Navbar({ OpenLogin }) {
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <Motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-[8vh] flex justify-between items-center px-10 max-md:px-2 cursor-pointer "
    >
      <Link to="/">
        <Motion.img
          whileTap={{ scale: 0.7 }}
          src="/logo.svg"
          alt="logo"
          className="w-[18vw] max-md:w-[28vh] mt-3"
        />
      </Link>

      <div className="flex gap-7 max-md:gap-3 max-md:text-sm items-center mr-2">
        <Motion.div
          whileTap={{ scale: 0.8 }}
          className="max-md:hidden text-[24px] bold"
        >
          <Link
            to="#pricing"
            className="text-[#e1e8ea] hover:text-[#13b6f6d9] transition duration-200"
          >
            Pricing
          </Link>
        </Motion.div>

        {userData && (
          <Motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 text-lg max-md:text-[3vw] semi-bold px-2 py-1 hover:bg-white/10"
          >
            <CoinsIcon size={20} className="text-yellow-400" />
            <span className="text-zinc-300">Credits </span>
            <span className="bold">{userData.credits}</span>
            <span>+</span>
          </Motion.div>
        )}

        {!userData ? (
          <Motion.div whileTap={{ scale: 0.8 }}>
            <div
              className="flex items-center text-[#e1e8ea] hover:bg-[#034b68d1] transition duration-200 max-md:text-sm text-[20px] bold border-2 border-[#13b6f6d9] px-2 py-1.5 rounded-xl bg-[#13b6f6d9]/20  max-md:py-1 max-md:mt-2"
              onClick={OpenLogin}
            >
              <LogInIcon size={23} className="inline-block mr-2"/>
              Get Started
            </div>
          </Motion.div>
        ) : (
          <div>
            <Motion.div
              whileTap={{ scale: 0.8 }}
              onClick={() => setOpenProfile(!openProfile)}
            >
              <img
                src={
                  userData.avatar ||
                  `https://ui-avatars.com/api/?background=7e57c2&color=fff&name=${userData.name}`
                }
                alt="no profile"
                className="w-10 h-10 max-md:w-9 max-md:h-9 rounded-full border-white/20 object-cover border-1"
              />
            </Motion.div>
            <AnimatePresence>{openProfile && <Profile />}</AnimatePresence>
          </div>
        )}
      </div>
    </Motion.div>
  );
}
