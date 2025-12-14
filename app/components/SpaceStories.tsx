'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import StoryViewer, { Story } from './StoryViewer';
import CameraModal from './stories/CameraModal';
import GameTemplateSelector from './stories/GameTemplateSelector';

interface HashtagChannel {
    id: string;
    tag: string;
    gradient: string;
    stories: Story[];
}

export default function SpaceStories() {
    const [selectedChannel, setSelectedChannel] = useState<HashtagChannel | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);
    const [activeTag, setActiveTag] = useState<string>('');

    // Mock Data for Hashtag Channels
    const channels: HashtagChannel[] = [
        {
            id: 'tag-1',
            tag: '#yemek',
            gradient: 'from-orange-400 to-red-600',
            stories: []
        },
        {
            id: 'tag-2',
            tag: '#kafamagöre',
            gradient: 'from-purple-500 to-indigo-600',
            stories: []
        },
        {
            id: 'tag-3',
            tag: '#sokak',
            gradient: 'from-emerald-400 to-teal-600',
            stories: []
        },
        {
            id: 'tag-4',
            tag: '#gece',
            gradient: 'from-blue-600 to-violet-600',
            stories: []
        },
        {
            id: 'tag-5',
            tag: '#etkinlik',
            gradient: 'from-pink-500 to-rose-500',
            stories: []
        }
    ];

    const handleTagClick = (tag: string) => {
        setActiveTag(tag);
        setIsCameraOpen(true);
    };

    const handleIfleClick = () => {
        setIsGameSelectorOpen(true);
    };

    return (
        <div className="pt-6 pb-2 pl-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {/* ifle! Button (My Story / Game Selector) */}
                <div
                    className="flex flex-col items-center gap-1 min-w-[72px] snap-start cursor-pointer group"
                    onClick={handleIfleClick}
                >
                    <div className="relative w-[72px] h-[72px] flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-neutral-200/80 border-2 border-neutral-300 border-dashed group-hover:border-solid group-hover:border-[#D32F2F] transition-all flex items-center justify-center overflow-hidden">
                            <span className="text-neutral-500 font-black text-xl tracking-tighter -rotate-12 select-none group-hover:text-[#D32F2F] transition-colors">ifle!</span>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#E50914] px-2 py-0.5 rounded-md border-2 border-white shadow-sm flex items-center justify-center z-10 min-w-[34px]">
                            <span className="text-[10px] font-black text-white leading-none tracking-tighter">EKLE</span>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-neutral-600">Hikaye At</span>
                </div>

                {/* Hashtag Channels */}
                {channels.map((channel) => (
                    <motion.div
                        key={channel.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1 min-w-[72px] snap-start cursor-pointer"
                        onClick={() => handleTagClick(channel.tag)}
                    >
                        <div className={`w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-tr ${channel.gradient} flex items-center justify-center border-2 border-transparent relative overflow-hidden shadow-sm`}>
                            {/* Inner Gradient Overlay for Depth */}
                            <div className="absolute inset-0 bg-white/10 opacity-50" />

                            <span className="text-white text-[11px] font-bold z-10 text-center px-1 break-words leading-tight">
                                {channel.tag}
                            </span>
                        </div>
                        <span className="text-[11px] font-medium text-neutral-800 truncate max-w-[72px] text-center">
                            {channel.tag}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isCameraOpen && (
                    <CameraModal
                        key="camera-modal"
                        isOpen={isCameraOpen}
                        onClose={() => setIsCameraOpen(false)}
                        activeTag={activeTag}
                    />
                )}
                {isGameSelectorOpen && (
                    <GameTemplateSelector
                        key="game-selector"
                        isOpen={isGameSelectorOpen}
                        onClose={() => setIsGameSelectorOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

