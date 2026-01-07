"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    MessageSquare,
    Users,
    Sparkles,
    Instagram
} from "lucide-react";

const contactInfo = [
    {
        icon: Mail,
        label: "Email Us",
        value: "contact@rootsofpi.org",
        href: "mailto:contact@rootsofpi.org",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Tashkent, Uzbekistan",
        href: null,
    },
    {
        icon: Phone,
        label: "Telegram",
        value: "@rootsofpi",
        href: "https://t.me/rootsofpi",
    },
];

const socialLinks = [
    { icon: MessageSquare, label: "Telegram", href: "https://t.me/rootsofpi", color: "from-blue-400 to-blue-600" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/rootsofpi", color: "from-pink-500 to-purple-600" },
    { icon: Mail, label: "Email", href: "mailto:contact@rootsofpi.org", color: "from-orange-400 to-rose-500" },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

            <div ref={ref} className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                    >
                        <MessageSquare size={16} />
                        Get In Touch
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Join Our{" "}
                        <span className="bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] bg-clip-text text-transparent">
                            Community
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ready to unlock your mathematical potential? Connect with us to stay updated on
                        upcoming events and join our growing community of problem solvers.
                    </p>
                </motion.div>

                {/* Contact Info - Centered Layout */}
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group text-center"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B4A] to-[#E91E63] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-900 font-semibold hover:text-primary transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-gray-900 font-semibold">{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links & CTA - Side by Side */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Social Links */}
                            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users size={20} className="text-primary" />
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}
                                        >
                                            <link.icon className="w-5 h-5 text-white" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 }}
                                className="p-6 bg-gradient-to-r from-[#FF6B4A] to-[#E91E63] rounded-2xl text-white"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Ready to Start?</h3>
                                        <p className="text-white/80 text-sm leading-relaxed mb-3">
                                            Join our Telegram community!
                                        </p>
                                        <a
                                            href="https://t.me/rootsofpi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-full font-semibold text-sm hover:bg-white/90 transition-colors"
                                        >
                                            Join Telegram
                                            <Send size={14} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
