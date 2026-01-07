"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Users, Trophy, Target, Sparkles, Calculator } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "Critical Thinking",
        description: "Develop problem-solving skills through olympiad-style mathematical challenges.",
        gradient: "from-orange-400 to-rose-500",
    },
    {
        icon: Users,
        title: "Vibrant Community",
        description: "Connect with 150+ passionate math lovers across Tashkent schools and colleges.",
        gradient: "from-rose-400 to-pink-500",
    },
    {
        icon: Trophy,
        title: "Competitive Events",
        description: "Monthly thematic contests with prizes funded by our education partners.",
        gradient: "from-pink-400 to-rose-600",
    },
    {
        icon: Target,
        title: "Skill Growth",
        description: "Progress from beginner puzzles to advanced olympiad problems at your own pace.",
        gradient: "from-rose-500 to-red-500",
    },
];

const mathFormulas = [
    "∫₀^∞ e^(-x²) dx = √π/2",
    "eⁱᵖ + 1 = 0",
    "∑ 1/n² = π²/6",
    "φ = (1+√5)/2",
    "∇×E = -∂B/∂t",
    "ax² + bx + c = 0",
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative py-32 px-6 overflow-hidden">
            {/* Floating math formulas */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {mathFormulas.map((formula, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.08 }}
                        transition={{ delay: i * 0.2 }}
                        className="absolute text-primary font-mono text-lg whitespace-nowrap"
                        style={{
                            top: `${15 + (i * 15)}%`,
                            left: i % 2 === 0 ? '5%' : '75%',
                        }}
                    >
                        <motion.span
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                            }}
                            transition={{
                                duration: 6 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="inline-block"
                        >
                            {formula}
                        </motion.span>
                    </motion.div>
                ))}
            </div>

            <div ref={ref} className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                    >
                        <Sparkles size={16} />
                        Our Mission
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Unlocking{" "}
                        <span className="bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] bg-clip-text text-transparent">
                            Mathematical Potential
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        At The Roots of PI, we are passionate about unlocking the potential of teenagers
                        through the power of mathematics. We foster critical thinking and problem-solving
                        skills through engaging events, challenges, and a supportive community.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-8 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                        </motion.div>
                    ))}
                </div>

                {/* Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#FF6B4A] via-[#E91E63] to-[#D81B60] text-white relative overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="relative grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <Calculator className="w-8 h-8 mx-auto mb-4 opacity-80" />
                            <div className="text-5xl font-bold mb-2">6+</div>
                            <div className="text-white/80 font-medium">Math Tournaments Organized</div>
                        </div>
                        <div>
                            <Users className="w-8 h-8 mx-auto mb-4 opacity-80" />
                            <div className="text-5xl font-bold mb-2">150+</div>
                            <div className="text-white/80 font-medium">Active Students</div>
                        </div>
                        <div>
                            <Trophy className="w-8 h-8 mx-auto mb-4 opacity-80" />
                            <div className="text-5xl font-bold mb-2">10+</div>
                            <div className="text-white/80 font-medium">Partner Organizations</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
