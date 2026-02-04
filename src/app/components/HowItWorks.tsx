"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";

type LoopingSequenceProps = {
  children: ReactNode;
  interval?: number;
};

function LoopingSequence({ children, interval = 5000 }: LoopingSequenceProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => setShow(true), 400);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={Date.now()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Dream (AI)",
      desc: "Input your unique preferences and desired feeling. Our GenAI instantly creates a detailed, day-by-day draft.",
      icon: "💭",
      animation: (
        <LoopingSequence interval={6000}>
          <motion.div
            className="w-64 h-20 flex flex-col justify-center items-start space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                transition: { staggerChildren: 0.6, delayChildren: 0 },
              },
            }}
          >
            <motion.div
              className="px-3 py-2 bg-white rounded-lg shadow text-xs text-gray-800"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              I want a relaxing beach trip 🌊
            </motion.div>
            <motion.div
              className="px-3 py-2 bg-indigo-100 rounded-lg shadow-sm text-xs text-gray-900 self-end"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              Great! How about Bali with a mix of culture + beaches?
            </motion.div>
          </motion.div>
        </LoopingSequence>
      ),
    },
    {
      id: 2,
      title: "Refine (Expert/Agent)",
      desc: "Your dedicated expert reviews the draft, adding their local knowledge, exclusive access, and real-time prices.",
      icon: "🧑‍💼",
      animation: (
        <LoopingSequence interval={7000}>
          <motion.div
            className="w-56 space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                transition: { staggerChildren: 0.7, delayChildren: 0 },
              },
            }}
          >
            <motion.div
              className="bg-white shadow-sm border rounded-md px-3 py-2 text-xs text-gray-700"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              ✈️ NYC → Paris <br /> 🏨 3 Nights Hotel
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-sm text-indigo-600 font-medium justify-center"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              🖊️ Agent reviewing…
            </motion.div>
            <motion.div
              className="flex items-center gap-1 text-sm text-green-600 font-semibold justify-center"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4 }}
            >
              ✅ Confirmed by Expert
            </motion.div>
          </motion.div>
        </LoopingSequence>
      ),
    },
    {
      id: 3,
      title: "Go (App)",
      desc: "Manage your entire trip, payments, and communicate with your concierge via the Traveller Dashboard App.",
      icon: "📱",
      animation: (
        <LoopingSequence interval={7000}>
          <motion.div
            className="w-40 space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                transition: { staggerChildren: 0.6, delayChildren: 0 },
              },
            }}
          >
            <motion.div
              className="bg-white shadow-sm border rounded-md px-3 py-2 text-xs text-gray-700"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              ✈️ NYC → LON
            </motion.div>
            <motion.div
              className=" shadow-sm border rounded-md px-3 py-2 text-xs text-gray-700"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              🏨 Hotel Confirmed
            </motion.div>
            <motion.div
              className="mt-2 text-green-600 font-medium text-sm flex justify-center"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4 }}
            >
              ✅ Trip Ready
            </motion.div>
          </motion.div>
        </LoopingSequence>
      ),
    },
  ];

  return (
    <section className="w-full  py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl font-bold text-center text-gray-900 mb-16"
        >
          How Our AI + Human Touch Works <br />
          <span className="text-indigo-600">(The 3-Step Flow)</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <AnimatePresence key={step.id} mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 shadow-md p-8 flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-6">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6">{step.desc}</p>
                <div className="mt-2">{step.animation}</div>
              </motion.div>

            </AnimatePresence>
          ))}
        </div>
      </div>
    </section>
  );
}
