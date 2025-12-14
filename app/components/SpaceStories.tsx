'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import StoryViewer, { Story } from './StoryViewer';

interface HashtagChannel {
    id: string;
    tag: string;
    gradient: string;
    stories: Story[];
}

export default function SpaceStories() {
    const [selectedChannel, setSelectedChannel] = useState<HashtagChannel | null>(null);

    // Mock Data for Hashtag Channels
    const channels: HashtagChannel[] = [
        {
            id: 'tag-1',
            tag: '#yemek',
            gradient: 'from-orange-400 to-red-600',
            stories: [
                {
                    id: 101,
                    user: "Anonim",
                    avatar: "", // Anonymous
                    media: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
                    type: 'image',
                    timestamp: "2d",
                    duration: 5
                },
                {
                    id: 102,
                    user: "Anonim",
                    avatar: "",
                    media: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
                    type: 'image',
                    timestamp: "4h",
                    duration: 5
                }
            ]
        },
        {
            id: 'tag-2',
            tag: '#kafamagöre',
            gradient: 'from-purple-500 to-indigo-600',
            stories: [
                {
                    id: 201,
                    user: "Anonim",
                    avatar: "",
                    media: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
                    type: 'image',
                    timestamp: "10m",
                    duration: 5
                }
            ]
        },
        {
            id: 'tag-3',
            tag: '#sokak',
            gradient: 'from-emerald-400 to-teal-600',
            stories: [
                {
                    id: 301,
                    user: "Anonim",
                    avatar: "",
                    media: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
                    type: 'image',
                    timestamp: "1h",
                    duration: 5
                }
            ]
        },
        {
            id: 'tag-4',
            tag: '#gece',
            gradient: 'from-blue-600 to-violet-600',
            stories: [
                {
                    id: 401,
                    user: "Anonim",
                    avatar: "",
                    media: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop",
                    type: 'image',
                    timestamp: "30m",
                    duration: 5
                }
            ]
        },
        {
            id: 'tag-5',
            tag: '#etkinlik',
            gradient: 'from-pink-500 to-rose-500',
            stories: [
                {
                    id: 501,
                    user: "Anonim",
                    avatar: "",
                    media: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
                    type: 'image',
                    timestamp: "15m",
                    duration: 5
                }
            ]
        }
    ];

    return (
        <div className="pt-6 pb-2 pl-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {/* ifle! Button (My Story) */}
                <div className="flex flex-col items-center gap-1 min-w-[72px] snap-start cursor-pointer group">
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
                        onClick={() => setSelectedChannel(channel)}
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

            <AnimatePresence>
                {selectedChannel && (
                    <StoryViewer
                        stories={selectedChannel.stories}
                        initialIndex={0}
                        onClose={() => setSelectedChannel(null)}
                        channelTitle={selectedChannel.tag} // Passing the tag name to be displayed
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

