"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HotelAnim() {
  const query = "4+ Stars · Free Breakfast";
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);

  const hotels = [
    { name: "Grand Palace", price: "$120" },
    { name: "Seaside Resort", price: "$150" },
    { name: "Skyline Suites", price: "$180" },
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(query.slice(0, i));
      i++;
      if (i > query.length) {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[80%] space-y-5">
      {/* Search input */}
      <div className="h-13 bg-gray-100 rounded-md px-4 flex items-center text-sm text-gray-700 font-medium">
        🔍 {typed}
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

      <div className="min-h-[220px] space-y-3 relative">
        <AnimatePresence mode="wait">
          {!showResults && typed.length === query.length && (
            <motion.div
              key="loader"
              className="absolute inset-0 flex items-start mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-2 w-28 bg-gray-200 rounded-full" />
            </motion.div>
          )}

          {showResults && (
            <motion.div
              key="results"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.25 },
                },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-3"
            >
              {hotels.map((hotel) => (
                <motion.div
                  key={hotel.name}
                  className="h-16 rounded-lg bg-gray-50 border flex items-center px-3 text-gray-800 text-sm shadow-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{hotel.name}</span>
                    <span className="text-xs text-gray-500">
                      from {hotel.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
