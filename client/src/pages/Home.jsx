import React from "react";
import Navbar from "@/components/Home/Navbar";
import Herosection from "@/components/Home/Herosection";
import Footer from "@/components/Home/Footer";
import Highlightes from "@/components/Home/Highlightes";

export default function Home() {
  return (
    <div className="max-w-screen max-h-screen overflow-x-hidden transition duration-400 text-7xl">
      <Navbar />
      <Herosection />
      <Highlightes />
      <Footer />
    </div>
  );
}
