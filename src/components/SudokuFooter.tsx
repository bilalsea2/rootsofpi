"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Sparkles, RefreshCw, Check, X, Sigma, Pi } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Classic Sudoku puzzle (0 = empty cell)
const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const socialLinks = [
    { name: "Telegram", href: "https://t.me/rootsofpi", icon: "📱" },
    { name: "Instagram", href: "https://instagram.com/rootsofpi", icon: "📸" },
    { name: "Email", href: "mailto:contact@rootsofpi.org", icon: "✉️" },
];

const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Community", href: "#community" },
    { name: "Contact", href: "#contact" },
];

function SudokuGame() {
    const [grid, setGrid] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [errors, setErrors] = useState<Set<string>>(new Set());

    useEffect(() => {
        resetPuzzle();
    }, []);

    const resetPuzzle = () => {
        setGrid(initialPuzzle.map(row => [...row]));
        setSelectedCell(null);
        setIsComplete(false);
        setErrors(new Set());
    };

    const checkErrors = useCallback((newGrid: number[][]) => {
        const newErrors = new Set<string>();

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (newGrid[i][j] !== 0 && newGrid[i][j] !== solution[i][j]) {
                    newErrors.add(`${i}-${j}`);
                }
            }
        }

        return newErrors;
    }, []);

    const handleCellClick = (row: number, col: number) => {
        if (initialPuzzle[row][col] === 0) {
            setSelectedCell({ row, col });
        }
    };

    const handleNumberInput = (num: number) => {
        if (selectedCell && initialPuzzle[selectedCell.row][selectedCell.col] === 0) {
            const newGrid = grid.map((row, i) =>
                row.map((cell, j) =>
                    i === selectedCell.row && j === selectedCell.col ? num : cell
                )
            );
            setGrid(newGrid);

            const newErrors = checkErrors(newGrid);
            setErrors(newErrors);

            // Check if complete
            const isAllFilled = newGrid.every(row => row.every(cell => cell !== 0));
            const isCorrect = newErrors.size === 0;
            setIsComplete(isAllFilled && isCorrect);
        }
    };

    const getCellClass = (row: number, col: number) => {
        const isOriginal = initialPuzzle[row][col] !== 0;
        const isSelected = selectedCell?.row === row && selectedCell?.col === col;
        const hasError = errors.has(`${row}-${col}`);
        const isInSameBox = selectedCell &&
            Math.floor(row / 3) === Math.floor(selectedCell.row / 3) &&
            Math.floor(col / 3) === Math.floor(selectedCell.col / 3);
        const isInSameRowOrCol = selectedCell &&
            (row === selectedCell.row || col === selectedCell.col);

        let classes = "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ";

        if (isSelected) {
            classes += "bg-primary text-white ring-2 ring-primary ring-offset-1 ";
        } else if (hasError) {
            classes += "bg-red-200 text-red-700 ";
        } else if (isInSameRowOrCol) {
            // Row/column highlight - more visible blue tint
            classes += "bg-sky-100 ";
        } else if (isInSameBox) {
            // Box highlight - subtle yellow/amber tint
            classes += "bg-amber-50 ";
        } else {
            classes += "bg-white hover:bg-gray-100 ";
        }

        if (isOriginal) {
            classes += "text-gray-800 font-bold ";
        } else {
            classes += "text-primary ";
        }

        // Border styling for 3x3 boxes
        if (col % 3 === 0 && col !== 0) classes += "border-l-2 border-l-primary/40 ";
        if (row % 3 === 0 && row !== 0) classes += "border-t-2 border-t-primary/40 ";

        return classes;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <Sparkles size={16} className="text-white" />
                <span>Solve the puzzle while you&apos;re here!</span>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-9 gap-[1px] bg-primary/30">
                    {grid.map((row, i) =>
                        row.map((cell, j) => (
                            <div
                                key={`${i}-${j}`}
                                className={getCellClass(i, j)}
                                onClick={() => handleCellClick(i, j)}
                            >
                                {cell !== 0 ? cell : ""}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Number Input */}
            <div className="flex gap-1 flex-wrap justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                        key={num}
                        onClick={() => handleNumberInput(num)}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold text-sm transition-all hover:scale-105"
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={() => handleNumberInput(0)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 text-white/70 rounded-lg text-xs transition-all hover:scale-105"
                >
                    <X size={14} className="mx-auto" />
                </button>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
                <button
                    onClick={resetPuzzle}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
                >
                    <RefreshCw size={14} />
                    Reset
                </button>
            </div>

            {/* Completion Message */}
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium"
                >
                    <Check size={18} />
                    Congratulations! Puzzle Solved! 🎉
                </motion.div>
            )}
        </div>
    );
}

export default function SudokuFooter() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <footer className="relative bg-gradient-to-br from-[#FF6B4A] via-[#E91E63] to-[#D81B60] text-white overflow-hidden">
            {/* Mathematical Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="math-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="1" fill="white" />
                            <text x="10" y="15" fontSize="8" fill="white" opacity="0.5">π</text>
                            <text x="45" y="45" fontSize="8" fill="white" opacity="0.5">∑</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#math-grid)" />
                </svg>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 bg-white rounded-xl p-1">
                                <Image
                                    src="/assets/logo.png"
                                    alt="The Roots of PI"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">The Roots of π</h3>
                                <p className="text-white/70 text-sm">Nonprofit Math Community</p>
                            </div>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            Fostering critical thinking and problem-solving skills among teenagers
                            through engaging math events and challenges in Tashkent.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-xl transition-all hover:scale-110"
                                    title={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h4 className="text-lg font-bold flex items-center gap-2">
                            <Pi size={20} />
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Math Quote */}
                        <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Sigma size={18} />
                                <span className="text-sm font-medium">Math Quote</span>
                            </div>
                            <p className="text-white/90 text-sm italic">
                                &quot;Mathematics is not about numbers, equations, or algorithms: it is about understanding.&quot;
                            </p>
                            <p className="text-white/60 text-xs mt-2">— William Paul Thurston</p>
                        </div>
                    </motion.div>

                    {/* Sudoku Game */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        id="community"
                    >
                        <h4 className="text-lg font-bold mb-4 text-center">
                            🧩 Mini Sudoku Challenge
                        </h4>
                        <SudokuGame />
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm"
                >
                    <p>© {new Date().getFullYear()} The Roots of PI. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
