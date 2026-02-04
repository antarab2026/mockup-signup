"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Sarah, NYC",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote: `This platform made planning my family trip effortless. Everything was seamless and stress-free. The itinerary suggestions were perfectly tailored to our needs, and we discovered hidden gems that made our vacation unforgettable. Highly recommended for anyone who loves stress-free planning.`,
  },
  {
    name: "Jason, LA",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    quote: `I loved the personalized suggestions. It felt like a travel concierge in my pocket. Booking flights, hotels, and experiences was quick and intuitive. The app saved me hours of research and gave me confidence in planning complex trips.`,
  },
  {
    name: "Priya, London",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    quote: `A beautifully designed app that actually understands how I want to travel. From adventure trips to relaxing getaways, everything was curated just for me. The AI recommendations were spot-on and helped me explore destinations I would have otherwise missed.`,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const review = reviews[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-16">
        What Travelers Are Saying
      </h2>

      <div className="relative w-full flex flex-col items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center mx-auto"
            style={{ width: "42rem", height: "24rem" }}
          >
            <Image
              src={review.avatar}
              alt={review.name}
              width={64}
              height={64}
              className="rounded-full mb-4 object-cover"
            />
            <div className="text-sm text-gray-700 leading-relaxed overflow-y-auto mb-4" style={{ maxHeight: "10rem" }}>
              “{review.quote}”
            </div>
            <p className="font-semibold text-gray-900 mb-2">{review.name}</p>
            <div className="flex text-yellow-400 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < review.rating ? "opacity-100" : "opacity-30"}
                >
                  ★
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={prevReview}
            className="px-5 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
          >
            ←
          </button>
          <button
            onClick={nextReview}
            className="px-5 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
