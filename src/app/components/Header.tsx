"use client";

import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";
import Image from "next/image";
import logoPrimary from "../assets/images/logoPrimary.png";

const navItems = [
  { label: "Plan Your Trip", href: "#plan" },
  { label: "Inspiration & Expertise", href: "#inspiration" },
  { label: "Why Us", href: "#why" },
  { label: "Support", href: "#support" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 w-full z-50 shadow-md bg-white transition-all ${scrolled ? "backdrop-blur-md" : ""
        }`}
    >

      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-4">
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Image
            src={logoPrimary}
            alt="Bonhomiee Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-[#00AFEF]">
            Bonho<span className="text-[#00AFEF]">miee</span>
          </span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
              className="relative group text-gray-700 hover:text-indigo-600"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100">
              <span>Login</span>
              <HiOutlineChevronDown size={16} />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-3 w-56 rounded-xl shadow-lg overflow-hidden border ">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                      }`}
                  >
                    Traveller Dashboard
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                      }`}
                  >
                    Agent / Provider
                  </a>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-md font-medium shadow-md bg-[#00AFEF] text-white hover:bg-[#0086b8]"
          >
            Book Demo
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
