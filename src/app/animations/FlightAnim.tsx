"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FlightAnim() {
  const query = "NYC → Paris · 15 Nov";
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(query.slice(0, i));
      i++;
      if (i > query.length) {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 500);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const flights = [
    { airline: "Air France", time: "10:40 AM - 2:30 PM", price: "$450" },
    { airline: "Delta", time: "1:20 PM - 5:10 PM", price: "$480" },
    { airline: "Lufthansa", time: "3:15 PM - 7:05 PM", price: "$495" },
  ];

  return (
    <div className="w-[80%] space-y-5">
      <div className="h-13 rounded-md bg-gray-100 flex items-center px-4 text-sm text-gray-700 font-medium">
        ✈️ {typed}
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

      <div className="min-h-[220px] space-y-3">
        <AnimatePresence mode="wait">
          {!showResults && typed.length === query.length && (
            <motion.div
              key="loader"
              className="h-2 w-28 bg-gray-200 rounded-full mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
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
              {flights.map((f) => (
                <motion.div
                  key={f.airline}
                  className="h-16 rounded-md bg-gray-50 border flex items-center justify-between px-4 text-sm shadow-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {f.airline}
                    </span>
                    <span className="text-xs text-gray-600">{f.time}</span>
                  </div>
                  <div className="font-semibold text-indigo-600">
                    {f.price}
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
