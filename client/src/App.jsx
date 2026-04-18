import React from "react";
import Particles from "./components/animation/Particles";
import Loader from "./components/common/Loader";
import { Outlet, useNavigation } from "react-router-dom";
import "./index.css";

export default function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <div
      className="relative min-h-screen isolate overflow-hiddenselect-none bg-[#120f17]"
      onContextMenu={(e) => e.preventDefault()}
    >
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
      {isLoading ? (
          <Loader />
      ) : null}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
