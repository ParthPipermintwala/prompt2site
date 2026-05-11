import React from "react";
import { motion as Motion } from "motion/react";

export default function Highlightes() {
  const highLights = [
    [
      "AI Generated Code",
      "prompt2site builds real websites - clean code, animation ,responsive design and scalable structure",
    ],
    [
      "Fully Responsive Layout",
      "prompt2site ensures your website looks great on all devices, from desktops to smartphones.",
    ],
    [
      "Production Ready Output",
      "prompt2site delivers production-ready websites that are optimized for performance and scalability.",
    ],
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="grid  max-md:grid-cols-1 grid-cols-3 gap-10 max-md:gap-0">
        {highLights.map((item, index) => {
          return (
            <Motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="rounded-2xl bg-white/8 border border-white/10 p-4 mb-5"
            >
              <h1 className="text-xl font-semibold mb-3">{item[0]}</h1>
              <p className="text-sm text-zinc-400">{item[1]}</p>
            </Motion.div>
          );
        })}
      </div>
    </section>
  );
}
