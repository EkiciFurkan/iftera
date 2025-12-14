'use client';

import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

export default function Stage() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black">
            {/* Atmospheric Background */}
            <div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253440-b393452de23e?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center blur-sm opacity-60 scale-110"
            />

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

            {/* Notifications Area */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-1/2 left-8 -translate-y-1/2 max-w-xs"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-xs font-bold tracking-widest uppercase">Live Now</span>
                </div>
                <h1 className="text-4xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
                    HAPPY<br />HOUR<br />BEGINS
                </h1>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-start gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Bell className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">50% Off Cocktails</h3>
                        <p className="text-neutral-400 text-xs mt-1">Until 22:00 at the main bar.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
