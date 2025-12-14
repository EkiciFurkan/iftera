'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Lock, Check } from 'lucide-react';
import { useState } from 'react';

interface AvatarStoreProps {
    onBack: () => void;
}

const STORE_ITEMS = [
    { id: 1, name: 'Neon Gözlük', price: 500, type: 'accessory', image: '👓' },
    { id: 2, name: 'Deri Ceket', price: 1200, type: 'clothing', image: '🧥' },
    { id: 3, name: 'Altın Kolye', price: 800, type: 'accessory', image: '📿' },
    { id: 4, name: 'Spor Ayakkabı', price: 600, type: 'shoes', image: '👟' },
    { id: 5, name: 'Kapkek Şapka', price: 300, type: 'headwear', image: '👒' },
    { id: 6, name: 'Robot Kol', price: 5000, type: 'cyber', image: '🦾' },
];

export default function AvatarStore({ onBack }: AvatarStoreProps) {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#F9F9F9] flex flex-col font-sans"
        >
            <div className="flex-1 relative bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all z-20"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* User Stats Overlay */}
                <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-xl text-white z-20 flex flex-col items-end">
                    <span className="text-xs text-white/60 font-medium tracking-wide uppercase">Bakiyeniz</span>
                    <span className="text-xl font-bold font-mono">2,450 P</span>
                </div>

                {/* Avatar SVG / Image Placeholder */}
                <div className="relative w-64 h-64 mb-8">
                    {/* Glowing effect behind avatar */}
                    <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full" />

                    {/* Simple Avatar Representation */}
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl relative z-10">
                        <circle cx="100" cy="90" r="50" fill="#f3d0b2" /> {/* Head */}
                        <rect x="60" y="140" width="80" height="60" rx="20" fill="#333" /> {/* Body */}
                        <circle cx="80" cy="80" r="5" fill="#000" /> {/* Eye */}
                        <circle cx="120" cy="80" r="5" fill="#000" /> {/* Eye */}
                        <path d="M 85 110 Q 100 120 115 110" stroke="#000" strokeWidth="3" fill="none" /> {/* Smile */}
                    </svg>

                    {/* Podium */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-white/5 rounded-[100%] blur-sm" />
                </div>
            </div>

            {/* 
        BOTTOM HALF: STORE GRID (50%) 
        Scrollable grid of items.
      */}
            <div className="flex-1 bg-white relative rounded-t-3xl -mt-6 z-10 overflow-hidden flex flex-col">
                {/* Handle Bar */}
                <div className="w-full flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1.5 bg-neutral-200 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 py-2 flex items-baseline justify-between">
                    <h2 className="text-2xl font-bold text-neutral-800">Mağaza</h2>
                    <span className="text-sm text-neutral-400">Yeni Gelenler</span>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                        {STORE_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item.id)}
                                className={`
                            border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all active:scale-95
                            ${selectedItem === item.id
                                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                                        : 'border-neutral-100 bg-neutral-50 hover:border-neutral-200'
                                    }
                        `}
                            >
                                <div className="text-4xl mb-2 filter drop-shadow-sm">{item.image}</div>
                                <h3 className="font-bold text-neutral-700 text-sm">{item.name}</h3>
                                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-neutral-100 shadow-sm">
                                    <span className="text-xs font-bold text-neutral-900">{item.price} P</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Padding for bottom safety area */}
                    <div className="h-8" />
                </div>

                {/* Buy Button (Floating Action) */}
                {selectedItem && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-6 left-6 right-6"
                    >
                        <button className="w-full bg-[#111] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/20 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <ShoppingBag className="w-5 h-5" />
                            Satın Al
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
