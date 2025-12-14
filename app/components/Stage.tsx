'use client';

import { motion } from 'framer-motion';
import { Home, Gift, ShoppingBag, User, Utensils } from 'lucide-react';
import SpaceStories from './SpaceStories';
import clsx from 'clsx';

interface StageProps {
    onIfGoClick: () => void;
}

export default function Stage({ onIfGoClick }: StageProps) {
    return (
        <div className="flex flex-col h-screen bg-[#F9F9F9] overflow-hidden">
            <header className="bg-[#D32F2F] pt-12 pb-4 px-4 shadow-sm relative z-20">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-white font-black text-2xl tracking-tighter leading-none inline-flex items-center gap-1">
                            <span className="bg-white text-[#D32F2F] px-1 rounded-sm">IF</span>
                            SOKAK
                        </h1>
                        <span
                            className="text-white/80 text-[10px] tracking-widest uppercase ml-8">Street Food Hall</span>
                    </div>
                    <div className="p-2 bg-white/20 rounded-xl">
                        <Utensils className="w-6 h-6 text-white"/>
                    </div>
                </div>
            </header>

            {/* YELLOW STRIPES SEPARATOR */}
            <div className="h-6 w-full bg-[#D32F2F] relative overflow-hidden">
                <div className="absolute inset-0 flex">
                    {Array.from({length: 40}).map((_, i) => (
                        <div key={i} className="w-4 h-full bg-yellow-400 -skew-x-45 ml-4"/>
                    ))}
                </div>
            </div>

            {/* BODY CONTENT */}
            <motion.div
                className="flex-1 relative overflow-y-auto"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
            >
                <SpaceStories/>

                <div className="px-6 pb-6">
                    <h2 className="text-3xl font-bold text-neutral-800">Kategoriler</h2>
                    <p className="text-neutral-500 mb-6">Canın ne istiyor?</p>

                    {/* Info Card */}
                    <div className="bg-[#F5F5F0] border border-neutral-200 p-6 rounded-xl text-center shadow-sm">
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Kategorileri görmek için bulunduğunuz <br/>
                            <span className="font-bold underline decoration-red-500 decoration-2 underline-offset-2">"Sipariş Ver"</span> butonuna
                            tıklayarak QR kodunu okutunuz.
                        </p>
                    </div>

                    {/* Decorative Divider */}
                    <div className="mt-12 h-4 w-full relative opacity-20">
                        <div className="absolute inset-0 flex">
                            {Array.from({length: 40}).map((_, i) => (
                                <div key={i} className="w-2 h-full bg-neutral-400 -skew-x-45 ml-2"/>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* BOTTOM NAVIGATION */}
            <div
                className="bg-white border-t border-neutral-200 px-6 py-3 flex items-center justify-between relative z-30 pb-8">
                <NavIcon icon={Home} label=""/>
                <NavIcon icon={Gift} label=""/>

                {/* CENTER ACTION BUTTON (IF GO) */}
                <div className="relative -top-8">
                    <button
                        onClick={onIfGoClick}
                        className="w-20 h-20 bg-[#D32F2F] rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-red-500/40 border-4 border-white transform transition-transform active:scale-95 group"
                    >
                        <div className="-rotate-45 flex flex-col items-center">
                            <span className="text-white font-black text-2xl group-hover:animate-pulse">IF</span>
                            <span className="text-white text-[10px] font-bold">GO</span>
                        </div>
                    </button>
                </div>

                <NavIcon icon={ShoppingBag} label=""/>
                <NavIcon icon={User} label=""/>
            </div>
        </div>
    );
}

function NavIcon({icon: Icon, label}: { icon: any, label: string }) {
    return (
        <button className="p-2 text-neutral-400 hover:text-neutral-800 transition-colors flex flex-col items-center">
            <Icon className="w-7 h-7" />
        </button>
    )
}
