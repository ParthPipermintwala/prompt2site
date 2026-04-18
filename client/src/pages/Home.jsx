import React from "react";
import Navbar from "@/components/Home/Navbar";
import Herosection from "@/components/Home/Herosection";
import Footer from "@/components/Home/Footer";
import Highlightes from "@/components/Home/Highlightes";
import Loginmodel from "./Loginmodel";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [openLogin, setOpenLogin] = React.useState(false);
  return (
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
  );
}
