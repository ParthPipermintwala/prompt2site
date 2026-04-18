import React from "react";
import Navbar from "@/components/common/Navbar";
import Herosection from "@/components/Home/Herosection";
import Footer from "@/components/common/Footer";
import Highlightes from "@/components/Home/Highlightes";
import Loginmodel from "./Loginmodel";
import { AnimatePresence } from "framer-motion";
import Particles from "@/components/animation/Particles";

export default function Home() {
  const [openLogin, setOpenLogin] = React.useState(false);
  return (
    <>
      <div className="max-w-screen max-h-screen overflow-x-hidden transition duration-400 text-7xl">
        <Navbar OpenLogin={() => setOpenLogin(true)} />
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
      <div className="fixed inset-0 z-0 pointer-events-none">
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
