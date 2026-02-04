"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function VacationAnim() {
  const query = "Add Destination";
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);

  const destinations = ["Rome · 3 Days", "Paris · 2 Days", "Santorini · 4 Days"];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(query.slice(0, i));
      i++;
      if (i > query.length) {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[80%] space-y-5">
      <div className="h-10 bg-gray-100 rounded-md px-4 flex items-center text-sm text-gray-700 font-medium">
        🌍 {typed}
        {typed.length < query.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        )}
      </div>

      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          {!showResults && typed.length === query.length && (
            <motion.div
              key="skeletons"
              className="space-y-3 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-md bg-gray-200 animate-pulse"
                />
              ))}
            </motion.div>
          )}

          {showResults && (
            <motion.div
              key="results"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.25 } },
              }}
              className="space-y-3 mt-3"
            >
              {destinations.map((d) => (
                <motion.div
                  key={d}
                  className="h-12 rounded-md bg-gray-50 border flex items-center px-3 text-gray-700 text-sm shadow-sm"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {d}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
