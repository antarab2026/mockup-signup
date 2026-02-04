"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChat,
  HiOutlineHome,
  HiOutlinePaperAirplane,
  HiOutlineTruck,
  HiArrowLeft,
  HiOutlineCloud,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { sendRasaMessage } from "../utils/rasaRestClient";


export default function ItenaryBuilder({ onBack }: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState("itenary");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! Ready to plan your next amazing trip?" },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setBotTyping(true);

    try {
      const rasaResponses = await sendRasaMessage("web-user", userMessage);

      if (Array.isArray(rasaResponses)) {
        setMessages((prev) => [
          ...prev,
          ...rasaResponses
            .filter((msg) => msg.text)
            .map((msg) => ({
              from: "bot",
              text: msg.text!,
            })),
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Unable to reach the travel assistant right now.",
        },
      ]);
    } finally {
      setBotTyping(false);
    }
  };



  const suggestions = [
    {
      name: "Italy",
      desc: "Explore Rome, Venice & Florence — art, wine, and timeless charm.",
      image:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Paris",
      desc: "Romantic walks, croissants, and the iconic Eiffel Tower view.",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Vietnam",
      desc: "Lush landscapes, ancient temples, and vibrant street life.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=60",
    },
  ];

  const travelInsights = [
    { name: "Weather", icon: <HiOutlineCloud size={20} /> },
    { name: "Visa", icon: <HiOutlineDocumentText size={20} /> },
    { name: "Budget", icon: <HiOutlineCurrencyDollar size={20} /> },
    { name: "Events", icon: <HiOutlineCalendar size={20} /> },
    { name: "Timing", icon: <HiOutlineClock size={20} /> },
    { name: "Safety", icon: <HiOutlineShieldCheck size={20} /> },
  ];

  return (
    <section id="itinerary-builder" className="relative min-h-screen flex flex-col items-center justify-center from-white to-blue-50 px-4 py-10 overflow-hidden">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-[#00AFEF] transition"
        >
          <HiArrowLeft size={18} />
          <span>Changed your mind?</span>
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
      >
        <div className="flex justify-between border-b bg-gray-50/70 backdrop-blur-sm">
          {[
            { key: "itenary", label: "Build Itinerary", icon: HiOutlineChat },
            { key: "accommodation", label: "Accommodations", icon: HiOutlineHome },
            { key: "flights", label: "Flights", icon: HiOutlinePaperAirplane },
            { key: "transfers", label: "Transfers", icon: HiOutlineTruck },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${activeTab === key
                ? "text-[#00AFEF] border-b-2 border-[#00AFEF] bg-white"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-white min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === "itenary" && (
              <motion.div
                key="itenary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col bg-gray-50/60 border border-gray-200 rounded-lg p-4 h-[500px]">
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 chat-scroll-overlay mb-4">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-3 text-sm rounded-lg max-w-[85%] ${msg.from === "bot"
                            ? "bg-white border border-gray-200 text-gray-800 self-start"
                            : "bg-[#00AFEF] text-white self-end ml-auto"
                            }`}
                        >
                          {msg.text}
                        </div>
                      ))}

                      {botTyping && (
                        <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-lg w-16 self-start flex items-center justify-between animate-pulse">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                        </div>
                      )}
                    </div>


                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && input.trim()) {
                            handleSend();
                          }
                        }}
                        placeholder="Ask Bonhomiee AI..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AFEF]"
                      />

                      <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`px-4 py-2 rounded-md text-sm transition
    ${input.trim()
                            ? "bg-[#00AFEF] text-white hover:bg-[#0095cb]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        Send
                      </button>

                    </div>
                  </div>

                  <div className="flex flex-col bg-gray-50/60 border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                    <h3 className="text-gray-800 font-semibold mb-3 text-base">
                      ✨ Suggested Destinations
                    </h3>
                    <div className="space-y-3">
                      {suggestions.map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.015 }}
                          className="flex items-center gap-4 bg-white rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-[#00AFEF]/40 hover:bg-blue-50/30 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div className="text-sm text-gray-700">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/60 border border-gray-200 rounded-lg p-4 w-full">
                  <h3 className="text-gray-800 font-semibold mb-3 text-base">
                    🧭 Travel Insight
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
                    {travelInsights.map((item) => (
                      <button
                        key={item.name}
                        className="flex flex-col items-center justify-center w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-sm text-gray-700 
                 hover:bg-blue-50 hover:border-[#00AFEF] transition-all duration-300 group"
                      >
                        <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                          {item.icon}
                        </span>
                        <span className="mt-1 text-xs font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>

                </div>
              </motion.div>
            )}

            {["accommodation", "flights", "transfers"].map((tab) => (
              activeTab === tab && (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-1 items-center justify-center text-gray-600 text-sm text-center"
                >
                  {tab === "accommodation" && <div className="text-5xl mb-2">🏨</div>}
                  {tab === "flights" && <div className="text-5xl mb-2">✈️</div>}
                  {tab === "transfers" && <div className="text-5xl mb-2">🚐</div>}
                  <div>
                    {tab === "accommodation" && "Explore curated stays tailored to your itinerary and budget."}
                    {tab === "flights" && "View flight deals, instant bookings, and route suggestions."}
                    {tab === "transfers" && "Manage airport pickups, local cabs, or intercity transfers."}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}
