"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import TestimonialsSection from "../ext/TestimonialsSection";

export default function FeaturesSection() {
  const emotions = [
    { title: "Feel Revitalized in Bali", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { title: "Feel Challenged in Patagonia", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { title: "Family Adventures", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { title: "Romantic Escapes", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { title: "Cultural Immersions", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff" },
    { title: "Wildlife Encounters", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  ];

  const signatureCards = [
    {
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      title: "Custom Itinerary Builder",
      desc: "AI-Powered, Expert-Verified",
      dummyText:
        "Plan your trips effortlessly. Create itineraries tailored to your preferences and schedule. Perfect for solo, family, or group travels.",
      cta: "Start Planning",
    },
    {
      img: "https://images.unsplash.com/photo-1602190276434-4cd5500bc6fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1195",
      title: "Corporate Travel",
      desc: "Policy Compliance, Expense Automation",
      dummyText:
        "Manage corporate trips seamlessly. Stay compliant, reduce manual work, and optimize travel expenses efficiently across teams.",
      cta: "Book a Demo",
    },
    {
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Direct Bookings",
      desc: "Global Inventory, Best Price Guarantee",
      dummyText:
        "Book flights, hotels, and experiences directly. Access the best rates worldwide and get instant confirmation for all your plans.",
      cta: "Search Now",
    },
  ];

  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-900 mb-12 text-center"
          >
            Signature Apps
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {signatureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-xl overflow-hidden shadow-md flex flex-col w-full ${
                  index === 2 ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col items-start gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.desc}</p>
                  <p className="text-gray-500 text-sm">{card.dummyText}</p>
                  <button className="mt-4 px-5 py-2 rounded-md text-sm font-medium text-white bg-[#00AFEF] hover:bg-[#009edc] transition">
                    {card.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-gray-900 text-center mb-6"
        >
          Where Will Your Emotions Take You?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Curated inspiration powered by GenAI personalization, designed to
          help you travel by how you want to feel.
        </motion.p>

        <div className="relative w-full h-20 overflow-hidden flex items-center">
          <motion.div
            className="flex gap-16 text-xl font-semibold text-gray-500"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
          >
            {[{ icon: "🌴", text: "Feel Revitalized in Bali" },
              { icon: "⛰️", text: "Feel Challenged in Patagonia" },
              { icon: "👨‍👩‍👧‍👦", text: "Family Adventures" },
              { icon: "❤️", text: "Romantic Escapes" },
              { icon: "🎭", text: "Cultural Immersions" },
              { icon: "🦁", text: "Wildlife Encounters" },
            ]
            .concat([{ icon: "🌴", text: "Feel Revitalized in Bali" },
              { icon: "⛰️", text: "Feel Challenged in Patagonia" },
              { icon: "👨‍👩‍👧‍👦", text: "Family Adventures" },
              { icon: "❤️", text: "Romantic Escapes" },
              { icon: "🎭", text: "Cultural Immersions" },
              { icon: "🦁", text: "Wildlife Encounters" },
            ])
            .map((item, i) => (
              <div key={i} className="flex items-center gap-3 whitespace-nowrap px-2 group">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className="relative pr-[2px] text-gray-500 group-hover:text-transparent bg-clip-text group-hover:animate-gradient"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #0004f6ff, #000792ff, #00004bff)",
                    backgroundSize: "200%",
                    backgroundPosition: "0% 50%",
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <TestimonialsSection />
      </div>
    </section>
  );
}
