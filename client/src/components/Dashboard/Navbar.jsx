import React from 'react'
import {motion as Motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import {useNavigate } from 'react-router-dom';

export default function Navbar() {
  const Navigate=useNavigate();
  return (
        <Motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-[#0c0a0f] border-b-1 border-white/10"
        >
          <Motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mx-auto px-3 h-16 flex items-center justify-between"
          >
            <div className="flex items-center gap-10 max-md:gap-4">
              <Motion.div whileTap={{ scale: 0.6 }}>
                {" "}
                <Motion.button
                  initial={{ rotate: -360 }}
                  animate={{ rotate: 0 }}
                  onClick={()=>{Navigate("/")}}
                  transition={{ duration: 0.3, ease: "easeInOut" ,delay: 0.05 }}
                  className="cursor-pointer rounded-lg hover:bg-white/10 transition p-1 hover:scale-105"
                >
                  <ArrowLeft size={24} />
                </Motion.button>
              </Motion.div>
              <h1  className="text-lg font-semibold">DashBoard</h1>
            </div>
            <button onClick={()=>{Navigate("/generate")}} className="cursor-pointer px-2 py-1 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition mr-5 max-md:mr-0">
              <span className="font-bold text-lg">+</span> New Website
            </button>
          </Motion.div>
        </Motion.div>
  )
}
