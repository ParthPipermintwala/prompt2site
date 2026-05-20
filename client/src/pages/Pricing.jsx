import { ArrowLeft, Check, Coins } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import useRazorpay from "@/hooks/useRazorpay";
const plans = [
  {
    name: "Free",
    price: "0",
    credits: 100,
    description: "Perfect for getting started and testing the platform.",
    features: [
      "100 free credits",
      "Basic AI features",
      "Community support",
      "Limited deploys",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    name: "Pro",
    price: "499",
    credits: 500,
    description: "Best for developers and creators who need more power.",
    features: [
      "5000 credits",
      "Advanced AI tools",
      "Priority support",
      "Unlimited deploys",
      "Faster processing",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "999",
    credits: 5000,
    description: "Built for teams and businesses with large-scale needs.",
    features: [
      "50000 credits",
      "Dedicated support",
      "Team collaboration",
      "Custom integrations",
      "Enterprise security",
    ],
    popular: false,
    button: "Contact Sales",
  },
];
export default function Pricing() {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const { initializePayment } = useRazorpay();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-8 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>
      <Motion.button
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        whileTap={{ scale: 0.7 }}
        transition={{ duration: 0 }}
        onClick={() => navigate("/")}
        className="relative cursor-pointer
         z-10 mb-8 flex items-center text-xl gap-2 text-zinc-400 hover:text-white transition-all "
      >
        <ArrowLeft size={22} /> Back
      </Motion.button>
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Powerful plans for every creator.
        </h1>
        <p className="text-zinc-400 text-lg">
          Buy credits once. Build anytime.
        </p>
      </Motion.div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { delay: 0, ease: "easeInOut" },
            }}
            transition={{ delay: i * 0.12 }}
            className={`relative rounded-3xl p-8 border backdrop-blur-xl ${plan.popular ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30" : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"}`}
          >
            {plan.popular && (
              <span className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-indigo-500">
                Most Popular
              </span>
            )}
            <h1 className="text-xl font-semibold mb-2">{plan.name}</h1>
            <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-bold">₹{plan.price}</span>
              <span className="text-sm text-zinc-400 mb-1">/one-time</span>
            </div>
            <div className="flex items-center gap-2 mb-8">
              <Coins size={18} className="text-yellow-400" />
              <span className="font-semibold">{plan.credits} Credits</span>
            </div>

            <ul className="space-y-3 mb-10">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <Check size={16} className="text-green-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setLoding(true);
                if (i == 0) {
                  navigate("/");
                  return;
                }
                initializePayment({
                  amount: plan.price,
                  planName: plan.name,
                  credits: plan.credits,
                });
                setLoding(false);
              }}
              title={!user ? "Please login first" : ""}
              disabled={ !user && loading}
              className={`disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer w-full py-3 rounded-xl font-semibold transition ${plan.popular ? "bg-indigo-500 hover:bg-indigo-600" : "bg-white/10 hover:bg-white/20"} disabled:opacity-60 ${i == 0 && "mt-13"}`}
            >
              {loading ? "Redirecting..." : plan.button}
            </Motion.button>
          </Motion.div>
        ))}
      </div>
    </div>
  );
}
