"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";

// Mathematical formulas to display with proper Unicode
const mathFormulas = [
    { text: "eⁱπ + 1 = 0", x: "10%", y: "20%", delay: 0 },
    { text: "∫₀^∞ e⁻ˣ² dx = √π/2", x: "75%", y: "15%", delay: 0.3 },
    { text: "Σ 1/n² = π²/6", x: "5%", y: "70%", delay: 0.6 },
    { text: "φ = (1+√5)/2", x: "85%", y: "65%", delay: 0.9 },
    { text: "∇ × E = -∂B/∂t", x: "15%", y: "45%", delay: 1.2 },
    { text: "det(A-λI) = 0", x: "80%", y: "40%", delay: 1.5 },
];

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
        >
            {/* Floating Math Formulas */}
            {mathFormulas.map((formula, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ delay: formula.delay + 1, duration: 1 }}
                    className="absolute text-primary/60 font-mono text-sm md:text-lg pointer-events-none select-none font-medium"
                    style={{ left: formula.x, top: formula.y }}
                >
                    <motion.span
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="inline-block"
                    >
                        {formula.text}
                    </motion.span>
                </motion.div>
            ))}

            <motion.div
                style={{ y, opacity, scale }}
                className="max-w-6xl mx-auto text-center space-y-8 relative z-10"
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        rotate: { duration: 1.5, ease: "easeOut" }
                    }}
                    className="flex justify-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                        className="relative w-36 h-36 md:w-44 md:h-44"
                    >
                        <Image
                            src="/assets/logo_improved.png"
                            alt="The Roots of PI Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-rose-500/30 blur-3xl -z-10 scale-150" />
                    </motion.div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-primary text-sm font-medium rounded-full border border-primary/20">
                        <Sparkles size={16} />
                        Nonprofit Math Community in Tashkent
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold"
                >
                    <span className="bg-gradient-to-r from-[#FF6B4A] via-[#E91E63] to-[#D81B60] bg-clip-text text-transparent">
                        The Roots of π
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed"
                >
                    Unlocking the potential of teenagers through the power of mathematics.
                    <span className="block mt-2 text-gray-500">
                        Join our vibrant community of problem solvers.
                    </span>
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto pt-8"
                >
                    {[
                        { value: "6", label: "Tournaments", suffix: "" },
                        { value: "150", label: "Students", suffix: "+" },
                        { value: "∞", label: "Possibilities", suffix: "" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ y: -5 }}
                            className="space-y-2 group"
                        >
                            <div className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-[#FF6B4A] to-[#E91E63] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                                {stat.value}
                                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                            </div>
                            <div className="text-sm md:text-base text-gray-500 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <motion.a
                        href="#events"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] text-white rounded-full text-lg font-semibold overflow-hidden shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-shadow flex items-center gap-2"
                    >
                        <span className="relative z-10">Explore Events</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#FF6B4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>

                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white border-2 border-primary/20 text-gray-700 rounded-full text-lg font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2"
                    >
                        <Play size={18} className="text-primary" />
                        Learn More
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-sm text-gray-400 font-medium">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
