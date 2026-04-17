import React from "react";
import Particles from "./components/Particles";

export default function App() {
  return (
    <>

      <div className="absolute top-0 left-0 w-screen h-screen">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
    
    </>
  );
}
