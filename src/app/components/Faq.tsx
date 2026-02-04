"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    question: "How do I start planning my custom vacation with Bonhomiee?",
    answer:
      "Simply sign up and fill out a brief profile—preferences, dates, party size. Then pick from AI-suggested itineraries or request fully bespoke planning. We handle logistics so you just enjoy.",
  },
  {
    question: "How does Bonhomiee personalize my travel itinerary?",
    answer:
      "We use your profile, local context (season, events), and AI logic to tailor suggestions. As you give feedback, the plan adapts with hidden-gem alerts and mood-based tweaks.",
  },
  {
    question: "Can I integrate my company’s leave calendar and HR system?",
    answer:
      "Yes—our platform connects to major HRMS & calendar tools (e.g. Workday). Paid time off, holidays, and policy rules feed directly into travel suggestions and approval flows.",
  },
  {
    question: "How secure is my data on Bonhomiee?",
    answer:
      "Your data is AES-256 encrypted at rest, TLS in transit. We follow ISO-aligned access policies, GDPR + Indian regulation. Profiles are in private partitions, and we never sell user data.",
  },
  {
    question: "What support do I get during my trip?",
    answer:
      "From booking confirmation onward, you have 24/7 access to our Care Team by chat, email, or phone. We assist with changes, emergencies, and local coordination.",
  },
];

export default function FAQCompact() {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive(active === i ? null : i);

  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4 sm:px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="py-6 cursor-pointer group"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 group-hover:text-[#00AFEF] transition-colors">
                {faq.question}
              </h3>
              <motion.span
                animate={{ rotate: active === i ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="text-gray-500 text-2xl"
              >
                <HiChevronDown />
              </motion.span>
            </div>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
