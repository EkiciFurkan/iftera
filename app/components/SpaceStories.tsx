'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import StoryViewer, { Story } from './StoryViewer';

export default function SpaceStories() {
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

    // Mock Data
    const stories: Story[] = [
        {
            id: 1,
            user: "Selin Y.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            media: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop",
            type: 'image',
            timestamp: "2d",
            duration: 5
        },
        {
            id: 2,
            user: "Mert K.",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            media: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1920&auto=format&fit=crop",
            type: 'image',
            timestamp: "15m",
            duration: 5
        },
        {
            id: 3,
            user: "IF Beşiktaş",
            avatar: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=200&auto=format&fit=crop",
            media: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop",
            type: 'image',
            timestamp: "1h",
            duration: 4
        },
        {
            id: 4,
            user: "Cem A.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            media: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920&auto=format&fit=crop",
            type: 'image',
            timestamp: "45m",
            duration: 5
        },
        {
            id: 5,
            user: "Ayşe T.",
            avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
            media: "https://images.unsplash.com/photo-1514525253440-b393452e2329?q=80&w=1920&auto=format&fit=crop",
            type: 'image',
            timestamp: "3h",
            duration: 6
        },
    ];

    return (
        <div className="pt-6 pb-2 pl-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {/* My Story Button */}
                <div className="flex flex-col items-center gap-1 min-w-[72px] snap-start cursor-pointer group">
                    <div className="relative w-[72px] h-[72px]">
                        <div className="absolute inset-0 rounded-full p-[2px] border-2 border-neutral-300 border-dashed group-hover:border-solid group-hover:border-[#D32F2F] transition-all">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                                alt="My Story"
                                className="w-full h-full rounded-full object-cover border-2 border-[#F9F9F9]"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Plus className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-neutral-600">Hikayen</span>
                </div>

                {/* Other Stories */}
                {stories.map((story, index) => (
                    <motion.div
                        key={story.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1 min-w-[72px] snap-start cursor-pointer"
                        onClick={() => setSelectedStoryIndex(index)}
                    >
                        <div className="w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                            <img
                                src={story.avatar}
                                alt={story.user}
                                className="w-full h-full rounded-full object-cover border-2 border-[#F9F9F9]"
                            />
                        </div>
                        <span className="text-[11px] font-medium text-neutral-800 truncate max-w-[72px] text-center">
                            {story.user}
                        </span>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedStoryIndex !== null && (
                    <StoryViewer
                        stories={stories}
                        initialIndex={selectedStoryIndex}
                        onClose={() => setSelectedStoryIndex(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

