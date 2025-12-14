'use client';

import { motion, Variants } from 'framer-motion';
import { Camera, Gift, User } from 'lucide-react';

const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export function ScreenCastTile() {
    return (
        <motion.div
            variants={itemVariants}
            className="bg-green-500 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer min-h-[140px]"
        >
            <Camera className="w-10 h-10 text-black mb-2 group-hover:rotate-12 transition-transform" />
            <h3 className="text-black font-bold text-lg text-center leading-none">Ekrana<br />Yansıt</h3>
        </motion.div>
    );
}

export function CouponTile() {
    return (
        <motion.div
            variants={itemVariants}
            className="bg-yellow-400 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer min-h-[140px]"
        >
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45" />
            <Gift className="w-10 h-10 text-black mb-2" />
            <h3 className="text-black font-bold text-lg text-center leading-none">Benim<br />Kuponum</h3>
            <span className="absolute top-2 right-2 text-[10px] bg-white px-1.5 py-0.5 rounded text-black font-bold transform rotate-6">
                1 HEDİYE
            </span>
        </motion.div>
    );
}

export function ProfileTile() {
    return (
        <motion.div
            variants={itemVariants}
            className="bg-neutral-900 border border-neutral-700 rounded-3xl p-4 flex flex-col justify-between group cursor-pointer hover:border-neutral-500 transition-colors min-h-[140px]"
        >
            <div className="flex items-start justify-between">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                    <User className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="text-right">
                    <h4 className="text-white font-bold text-lg">Pars</h4>
                    <span className="text-neutral-400 text-xs">Müdavim</span>
                </div>
            </div>
            <div>
                <span className="text-2xl font-black text-white block">2,450</span>
                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">Puan Kazanıldı</span>
            </div>
        </motion.div>
    );
}

interface AvatarStoreTileProps {
    onClick?: () => void;
}

export function AvatarStoreTile({ onClick }: AvatarStoreTileProps) {
    return (
        <motion.div
            variants={itemVariants}
            onClick={onClick}
            className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] border border-white/10 rounded-3xl p-0 relative overflow-hidden group cursor-pointer min-h-[140px]"
        >
            {/* Avatar Visual */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 flex justify-center items-end group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 200 200" className="w-32 h-32 drop-shadow-2xl">
                    <circle cx="100" cy="90" r="50" fill="#f3d0b2" />
                    <rect x="60" y="140" width="80" height="60" rx="20" fill="#333" />
                </svg>
            </div>

            {/* Text / CTA */}
            <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20">
                    Mağaza
                </span>
            </div>
        </motion.div>
    );
}
