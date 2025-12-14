'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Copy } from 'lucide-react';
import { icebreakerQuestions } from './data/icebreaker-questions';

interface IcebreakerGameProps {
    onClose: () => void;
}

export default function IcebreakerGame({ onClose }: IcebreakerGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const getRandomQuestionIndex = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * icebreakerQuestions.length);
        } while (newIndex === currentQuestionIndex && icebreakerQuestions.length > 1);
        return newIndex;
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentQuestionIndex(getRandomQuestionIndex());
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            rotate: direction > 0 ? 45 : -45,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            rotate: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            rotate: direction < 0 ? 45 : -45,
            opacity: 0
        })
    };

    const currentQuestion = icebreakerQuestions[currentQuestionIndex];

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 group"
            >
                <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform" />
            </button>

            <div className="w-full max-w-sm aspect-[3/4] relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div
                            className="w-full h-full bg-gradient-to-br from-[#9F0013] via-[#D30019] to-[#80000D] rounded-3xl p-8 flex flex-col justify-between shadow-2xl cursor-pointer border-[3px] border-white/20"
                            onClick={handleNext}
                        >
                            <div className="flex justify-between items-start">
                                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                                    <span className="text-4xl">🤔</span>
                                </div>
                                <div className="text-white/60 font-mono text-sm">#{currentQuestionIndex + 1}</div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-3xl font-bold text-white text-center leading-snug drop-shadow-md">
                                    {currentQuestion}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 5, ease: "linear" }}
                                        key={currentQuestionIndex}
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium">
                                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                                    <span>Değiştirmek için dokun</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Background stack effect */}
                <div className="absolute inset-0 bg-rose-500/20 rounded-3xl transform rotate-3 scale-95 -z-10 translate-y-4 border border-rose-500/10" />
                <div className="absolute inset-0 bg-red-900/40 rounded-3xl transform -rotate-2 scale-90 -z-20 translate-y-8 border border-red-500/10" />
            </div>
        </motion.div>
    );
}
