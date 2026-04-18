import FuzzyText from "@/components/animation/FuzzyText";
import React from "react";
export default function ErrorPage() {
  return (
   <div className="w-screen h-screen flex justify-center items-center p-10">
     <FuzzyText baseIntensity={0.1} hoverIntensity={0.3} enableHover>
      404 Page Not Found
    </FuzzyText>
   </div>
  );
}