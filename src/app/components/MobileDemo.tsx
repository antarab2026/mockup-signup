"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePaperAirplane, HiOutlineBriefcase, HiOutlineSearch, HiOutlineGlobe } from "react-icons/hi";
import FlightAnim from "../animations/FlightAnim";
import VacationAnim from "../animations/VacationAnim";
import HotelAnim from "../animations/HotelAnim";


const scenes = [
    {
        id: "flight",
        title: "Searching Flights",
        desc: "Find the best routes, compare fares, and confirm instantly.",
        icon: <HiOutlinePaperAirplane size={22} />,
        component: FlightAnim,
    },
    {
        id: "vacation",
        title: "Building a Vacation",
        desc: "Craft your itinerary with destinations and experiences.",
        icon: <HiOutlineGlobe size={22} />,
        component: VacationAnim,
    },
    {
        id: "hotel",
        title: "Looking at Hotels",
        desc: "Smart filters and curated stays surface instantly.",
        icon: <HiOutlineSearch size={22} />,
        component: HotelAnim,
    },
    {
        id: "corporate",
        title: "Corporate Trips",
        desc: "Policy checks, approvals, and automated cost control.",
        icon: <HiOutlineBriefcase size={22} />,
        component: () => (
            <div className="w-[80%] space-y-4">
                <motion.div
                    className="h-16 bg-gray-50 border rounded-lg flex items-center px-4 text-gray-700 text-sm"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: [-50, 0, 0], opacity: [0, 1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                >
                    ✈️ Flight Request · NYC → LON
                </motion.div>

                <motion.div
                    className="h-12 bg-gray-100 rounded-md flex items-center justify-between px-4 text-sm text-gray-600"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: [0.9, 1, 1], opacity: [0, 1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1, repeatDelay: 2 }}
                >
                    Manager Approval
                    <motion.span
                        className="ml-2 text-green-600 font-semibold"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        ✅
                    </motion.span>
                </motion.div>

                <motion.div
                    className="h-12 bg-gray-50 border rounded-md flex items-center justify-center text-sm text-indigo-600 font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: [20, 0, 0], opacity: [0, 1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 2, repeatDelay: 2 }}
                >
                    💰 Saved $250 vs market fare
                </motion.div>
            </div>
        ),
    }

];

export default function MobileDemo() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setActive((prev) => (prev + 1) % scenes.length);
        }, 8000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="w-[900px] h-[480px] bg-white shadow-xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scenes[active].id + "-header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-2 rounded-md  shadow text-gray-700">
                            {scenes[active].icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {scenes[active].title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {scenes[active].desc}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex-1 relative p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scenes[active].id}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {React.createElement(scenes[active].component)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
