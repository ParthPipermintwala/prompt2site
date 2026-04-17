import React from "react";
import Particles from "./components/Particles";
import { Outlet } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen -z-10 bg-[#120F17]">
        <Particles
          particleColors={["#8FDFFF"]}
          particleCount={400}
          particleSpread={20}
          speed={0.2}
          particleBaseSize={150}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={2}
        />
      </div>
      <Outlet />
    </>
  );
}
