import React from "react";
import { motion as Motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";

export default function Loginmodel({ isOpen, CloseLogin }) {
  return (
    <>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0, y: -1000 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -1000 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs px-4"
          onClick={CloseLogin}
        >
          <Motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="relative w-full max-w-md p-1 rounded-3xl bg-linear-to-br from-purple-500/40 via-blue-500/40 to-transparent shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-3xl bg-[#0b0b0b] overflow-hidden p-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  CloseLogin();
                }}
                className="cursor-pointer absolute top-5 right-5 text-lg z-50 hover:scale-110 transition-transform duration-200"
              >
                ❌
              </button>

              <div className=" px-8 pb-10 text-center">
                <h1 className="inline-block mb-5 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300">
                  {" "}
                  AI-Powered Website Builder
                </h1>
                <h2 className="text-2xl font-semibold mb-3 space-x-2 text-white">
                  <span>welcome to</span>
                  <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    prompt2site
                  </span>
                </h2>
              </div>

              <div className="w-full flex items-center justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  theme="filled_blue"
                  size="large"
                  shape="pill"
                  text="continue_with"
                  width="250"
                  auto_select
                  useOneTap
                />
              </div>

              <div className="flex items-center gap-4 mt-10 mb-3 justify-center">
                <div className="h-0.5 flex-1 bg-white/10" />
                <span className="text-sm text-zinc-500">Secure Login </span>
                <div className="h-0.5 flex-1 bg-white/10" />
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed text-center">
                By continuing, you agree to our{" "}
                <span className="hover:text-zinc-300 hover:underline cursor-pointer underline">
                  Terms of Service
                </span>
                {" "}and{" "}
                <span className="hover:text-zinc-300 hover:underline cursor-pointer underline">
                  Privacy Policy
                </span>
              </p>

            </div>
          </Motion.div>
        </Motion.div>
      )}
    </>
  );
}
