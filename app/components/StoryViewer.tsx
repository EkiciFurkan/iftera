'use client';

// ... imports
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send, MoreHorizontal, Hash } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface Story {
    id: number;
    user: string;
    avatar: string;
    media: string; // URL to image or video
    type: 'image' | 'video';
    duration?: number; // duration in seconds
    timestamp: string;
}

interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
    channelTitle?: string; // Optional channel title (e.g., #yemek)
}

export default function StoryViewer({ stories, initialIndex, onClose, channelTitle }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);

    const currentStory = stories[currentIndex];

    // ... (useEffect for timer remains same, but omitted for brevity in replace block if possible, but I must provide contiguous block. I will copy mostly everything to be safe)

    useEffect(() => {
        // Reset progress when slide changes
        setProgress(0);

        const duration = currentStory.duration || 5;
        const intervalTime = 50; // Update every 50ms
        const increment = (intervalTime / (duration * 1000)) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (currentIndex < stories.length - 1) {
                        setCurrentIndex(prevIndex => prevIndex + 1);
                        return 0;
                    } else {
                        onClose();
                        return 100;
                    }
                }
                return prev + increment;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [currentIndex, stories.length, onClose, currentStory.duration]);

    // ... handleNext/Prev ...
    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col"
        >
            {/* Progress Bars */}
            <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
                {stories.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: currentIndex > idx ? '100%' : '0%' }}
                            animate={{ width: currentIndex === idx ? `${progress}%` : currentIndex > idx ? '100%' : '0%' }}
                            transition={{ ease: "linear", duration: 0 }}
                        />
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="absolute top-4 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Hashtag Icon / Avatar Placeholder */}
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                        <Hash className="w-5 h-5 text-white" />
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-sm tracking-wide">
                            {channelTitle || currentStory.user}
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className="text-white/60 text-xs">{currentStory.timestamp}</span>
                            {!channelTitle && <span className="text-white/40 text-[10px]">• Anonim</span>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <MoreHorizontal className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-8 h-8 text-white" />
                    </button>
                </div>
            </div>

            {/* Content & Navigation */}
            <div className="flex-1 relative bg-neutral-900 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 w-1/3 z-10"
                    onClick={handlePrev}
                />
                <div
                    className="absolute inset-y-0 right-0 w-2/3 z-10"
                    onClick={handleNext}
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStory.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center p-0 md:p-12 relative"
                    >
                        {currentStory.type === 'video' ? (
                            <video
                                src={currentStory.media}
                                className="w-full h-full object-cover md:rounded-2xl"
                                autoPlay
                                playsInline
                                muted // Muted for autoplay policy, simple for now
                            />
                        ) : (
                            <img
                                src={currentStory.media}
                                alt="Story"
                                className="w-full h-full object-cover md:rounded-2xl"
                            />
                        )}

                        {/* Interactive overlay gradient at bottom */}
                        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none md:rounded-b-2xl" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer Input */}
            {/* Footer Interaction - Just Like */}
            <div className="relative z-20 p-8 flex items-center justify-center">
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Heart animation logic could go here
                    }}
                    className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group hover:bg-white/20 transition-all shadow-lg active:bg-red-500/20 active:border-red-500/50"
                >
                    <Heart className="w-8 h-8 text-white group-active:text-red-500 group-active:fill-red-500 transition-colors" />
                </motion.button>
            </div>
        </motion.div>
    );
}
