"use client";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
                <div>
                    <h3 className="text-xl font-bold text-white">Bonhomiee</h3>
                    <p className="text-sm text-gray-400 mt-3">
                        Curated journeys, powered by AI + human expertise.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/about" className="hover:text-white">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:text-white">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
                    <p className="text-sm">📞 +1 (800) 555-1234</p>
                    <p className="text-sm">✉️ hello@Bonhomiee.com</p>
                    <div className="flex gap-4 mt-4">
                        <Link href="https://linkedin.com" target="_blank">
                            <FaLinkedin className="text-xl hover:text-white" />
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                            <FaInstagram className="text-xl hover:text-white" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank">
                            <FaTwitter className="text-xl hover:text-white" />
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-5 text-center md:text-left">
                    <h4 className="text-sm font-semibold text-white">
                        Are you a Travel Agent or Tour Operator?
                    </h4>
                    <p className="text-xs text-gray-400 mt-2">
                        Unlock access to our partnership tools and agent dashboard.
                    </p>
                    <Link
                        href="/agent-login"
                        className="mt-4 inline-block px-5 py-2 rounded-lg bg-[#00AFEF] text-white text-sm font-medium shadow hover:bg-[#0086b8] transition-colors"
                    >
                        Explore Partnership Tools
                    </Link>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 py-6 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Bonhomiee. All rights reserved.
            </div>
        </footer>
    );
}
