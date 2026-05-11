import React, { useState } from "react";
import Herosection from "@/components/Home/Herosection";
import Footer from "@/components/common/Footer";
import Highlightes from "@/components/Home/Highlightes";
import Loginmodel from "../components/Home/Loginmodel";
import { AnimatePresence } from "framer-motion";
import Particles from "@/components/animation/Particles";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import Navbar from "@/components/Home/Navbar";

export default function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  useGetCurrentUser();

  return (
    <>
      <div
        onClick={() => {
          setOpenProfile(false);
        }}
        className="max-w-screen max-h-screen overflow-x-hidden transition duration-400 text-7xl"
      >
        <Navbar
          OpenLogin={() => setOpenLogin(true)}
          SetProfile={() => setOpenProfile(!openProfile)}
          isOpenProfile={openProfile}
        />
        <Herosection OpenLogin={() => setOpenLogin(true)} />
        <Highlightes />
        <Footer />
        <AnimatePresence mode="wait">
          {openLogin && (
            <Loginmodel
              isOpen={openLogin}
              CloseLogin={() => setOpenLogin(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles
          particleColors={["#6dbfdf"]}
          particleCount={450}
          particleSpread={20}
          speed={0.4}
          particleBaseSize={150}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
    </>
  );
}
