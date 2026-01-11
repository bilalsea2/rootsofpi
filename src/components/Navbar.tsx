"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#events", label: "Events" },
    { href: "#community", label: "Community" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const { scrollY } = useScroll();

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
    );

    const backdropBlur = useTransform(
        scrollY,
        [0, 100],
        ["blur(0px)", "blur(20px)"]
    );

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            style={{ backgroundColor }}
            className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${hasScrolled ? "shadow-lg shadow-primary/5" : ""
                }`}
        >
            <motion.div
                style={{ backdropFilter: backdropBlur }}
                className="absolute inset-0"
            />
            <nav className="relative max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="relative w-10 h-10"
                        >
                            <Image
                                src="/assets/logo_improved.svg"
                                alt="The Roots of PI"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] bg-clip-text text-transparent">
                            Roots of π
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative text-gray-700 font-medium hover:text-primary transition-colors group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] text-white rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                        >
                            Join Us
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-gray-700 font-medium hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button className="w-full py-3 bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] text-white rounded-full font-semibold">
                            Join Us
                        </button>
                    </div>
                </motion.div>
            </nav>
        </motion.header>
    );
}
