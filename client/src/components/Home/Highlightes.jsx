import React from "react";
import { motion as Motion } from "motion/react";

export default function Highlightes() {
  const highLights = [
    "AI Genrated Code",
    "Fully Responsive Layout",
    "Production Reday Output",
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
              className="rounded-2xl bg-white/8 border border-white/10 p-8 mb-5"
            >
              <h1 className="text-xl font-semibold mb-3">{item}</h1>
              <p className="text-sm text-zinc-400">
                prompt2site builds real websites - clean code, animation ,
                responsive design and scalable structure{" "}
              </p>
            </Motion.div>
          );
        })}
      </div>
    </section>
  );
}
