'use client';

import { motion } from 'framer-motion';
import { X, Gamepad2, Play, Trophy, User } from 'lucide-react';

interface GameTemplateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GameTemplateSelector({ isOpen, onClose }: GameTemplateSelectorProps) {
    if (!isOpen) return null;

    const templates = [
        { id: 1, name: "Space Runner", color: "bg-purple-600", icon: <Gamepad2 className="w-6 h-6" /> },
        { id: 2, name: "Trivia Quiz", color: "bg-blue-600", icon: <Trophy className="w-6 h-6" /> },
        { id: 3, name: "Face Match", color: "bg-amber-600", icon: <User className="w-6 h-6" /> },
        { id: 4, name: "Neon Driver", color: "bg-pink-600", icon: <Play className="w-6 h-6" /> },
    ];

    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-80 z-[60] bg-neutral-900 border-r border-white/10 flex flex-col shadow-2xl"
        >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                    <h2 className="text-white font-bold text-lg">Oyun Şablonu</h2>
                    <p className="text-white/50 text-xs">Hikayene bir oyun ekle</p>
                </div>
                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-xl p-4 flex items-center gap-4 group text-left"
                    >
                        <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                            {template.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-medium text-sm">{template.name}</h3>
                            <span className="text-xs text-white/40 group-hover:text-[#D32F2F] transition-colors">Seç ve Oyna</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-neutral-900">
                <button onClick={onClose} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm font-medium transition-colors">
                    İptal Et
                </button>
            </div>
        </motion.div>
    );
}
