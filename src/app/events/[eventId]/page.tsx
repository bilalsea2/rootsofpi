"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Users,
    X,
    ChevronLeft,
    ChevronRight,
    Camera,
    Download,
    Share2
} from "lucide-react";
import { events } from "@/components/EventGallery";

export default function EventDetailPage() {
    const params = useParams();
    const eventId = params.eventId as string;
    const event = events.find(e => e.id === eventId);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                    <p className="text-gray-600 mb-8">The event you&apos;re looking for doesn&apos;t exist.</p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImage === null) return;
        if (direction === "prev") {
            setSelectedImage(selectedImage === 0 ? event.gallery.length - 1 : selectedImage - 1);
        } else {
            setSelectedImage(selectedImage === event.gallery.length - 1 ? 0 : selectedImage + 1);
        }
    };

    return (
        <>
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                    <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-60`} />
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-6 left-6 z-10"
                    >
                        <Link
                            href="/#events"
                            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full font-medium hover:bg-white/30 transition-all"
                        >
                            <ArrowLeft size={18} />
                            Back to Events
                        </Link>
                    </motion.div>

                    {/* Event Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="max-w-5xl mx-auto">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`inline-block px-4 py-2 bg-gradient-to-r ${event.gradient} text-white text-sm font-semibold rounded-full mb-4`}
                            >
                                {event.theme}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                            >
                                {event.title}
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-6 text-white/90"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={18} />
                                    <span>{event.participants} participants</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-5xl mx-auto px-6 py-12">
                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {event.description}
                        </p>
                    </motion.div>

                    {/* Gallery Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Camera size={24} className="text-primary" />
                            Photo Gallery
                            <span className="text-base font-normal text-gray-500">
                                ({event.gallery.length} photos)
                            </span>
                        </h2>
                    </motion.div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {event.gallery.map((photo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedImage(index)}
                                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                            >
                                <Image
                                    src={photo}
                                    alt={`${event.title} photo ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        className="opacity-0 group-hover:opacity-100 bg-white/90 text-primary p-3 rounded-full"
                                    >
                                        <Camera size={20} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Related Events */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-16"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Events</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {events
                                .filter(e => e.id !== event.id)
                                .slice(0, 3)
                                .map((relatedEvent) => (
                                    <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                                        <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                                            <div className="relative h-32 overflow-hidden">
                                                <Image
                                                    src={relatedEvent.thumbnail}
                                                    alt={relatedEvent.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t ${relatedEvent.gradient} opacity-40`} />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                                    {relatedEvent.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">{relatedEvent.date}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
                            className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
                            className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={event.gallery[selectedImage]}
                                alt={`${event.title} photo ${selectedImage + 1}`}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                            {selectedImage + 1} / {event.gallery.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
