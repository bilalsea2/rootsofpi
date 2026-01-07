"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { galleryImages } from "@/data/galleryImages";
import { cn } from "@/lib/utils";

// Utility to shuffle array for random feeling
const shuffle = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

// Split images into columns
const useGalleryColumns = (images: string[], columnCount: number) => {
    const [columns, setColumns] = useState<string[][]>([]);

    useEffect(() => {
        const shuffled = shuffle(images);
        const cols: string[][] = Array.from({ length: columnCount }, () => []);

        shuffled.forEach((img, i) => {
            cols[i % columnCount].push(img);
        });

        // Duplicate for infinite scroll
        setColumns(cols.map(col => [...col, ...col, ...col]));
    }, [images, columnCount]);

    return columns;
};

const GalleryColumn = ({
    images,
    direction = "down",
    speed = 50,
    className
}: {
    images: string[],
    direction?: "up" | "down",
    speed?: number,
    className?: string
}) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const y = useMotionValue(0);

    // We need to move the column. 
    // If direction is down, we move from negative top towards 0 (or simply animate y).
    // Let's use a simpler approach: wrapping animate

    return (
        <div className={cn("relative h-full overflow-hidden", className)}>
            <motion.div
                animate={{
                    y: direction === "down" ? ["-33.33%", "0%"] : ["0%", "-33.33%"]
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex flex-col gap-4"
            >
                {images.map((img, i) => (
                    <div key={`${img}-${i}`} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <Image
                            src={`/gallery/${img}`}
                            alt="Event photo"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function ScrollingGallery() {
    // Determine column count based on window width (in a real app, use useMediaQuery or standard responsive CSS with hiding)
    // For simplicity with SSR/hydration, we'll render all 4 columns but hide them via CSS classes

    const columns = useGalleryColumns(galleryImages, 4);

    return (
        <section className="relative py-20 bg-gray-50 overflow-hidden min-h-screen">
            {/* Header */}
            <div className="text-center mb-12 px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">Memories</span>
                </motion.h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Capturing the moments of brilliance, teamwork, and joy from our mathematical journey.
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 h-[800px] overflow-hidden mask-linear-fade">
                {/* Column 1 - Down */}
                <GalleryColumn images={columns[0] || []} direction="down" speed={45} />

                {/* Column 2 - Up */}
                <GalleryColumn images={columns[1] || []} direction="up" speed={55} />

                {/* Column 3 - Down - Hidden on mobile */}
                <GalleryColumn images={columns[2] || []} direction="down" speed={50} className="hidden md:block" />

                {/* Column 4 - Up - Hidden on tablet/mobile */}
                <GalleryColumn images={columns[3] || []} direction="up" speed={60} className="hidden lg:block" />
            </div>

            {/* Gradient Overlay for smooth fade top/bottom */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
        </section>
    );
}
