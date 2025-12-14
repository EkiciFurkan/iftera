'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, User } from 'lucide-react';

interface WhoPaysGameProps {
    onClose: () => void;
}

export default function WhoPaysGame({ onClose }: WhoPaysGameProps) {
    const [players, setPlayers] = useState<string[]>([]);
    const [newName, setNewName] = useState('');
    const [stage, setStage] = useState<'input' | 'spinning' | 'result'>('input');
    const [winner, setWinner] = useState<string | null>(null);

    // Wheel state
    const [rotation, setRotation] = useState(0);

    const colors = [
        '#9F0013', // Deep Red
        '#D30019', // Cherry Red (Lighter)
        '#80000D', // Darkest Red
        '#B91C1C', // Standard Red 700
        '#991B1B', // Red 800
        '#7F1D1D'  // Red 900
    ];

    const handleAddPlayer = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (newName.trim() && players.length < 12) {
            setPlayers([...players, newName.trim()]);
            setNewName('');
        }
    };

    const removePlayer = (index: number) => {
        setPlayers(players.filter((_, i) => i !== index));
    };

    const spinWheel = () => {
        if (players.length < 2) return;

        setStage('spinning');

        // Pick a random winner index
        const winnerIndex = Math.floor(Math.random() * players.length);
        const winnerName = players[winnerIndex];
        setWinner(winnerName);

        // Calculate rotation to land on the winner
        // Each slice is 360 / players.length degrees
        const sliceAngle = 360 / players.length;

        // We want the winner slice to be at the top (270 degrees or -90 degrees usually, depending on CSS)
        // Let's assume pointer is at top (0 deg). 
        // To land a slice at 0 deg, we need to rotate safely.
        // Random extra spins (5-10 full rotations)
        const extraSpins = 360 * (5 + Math.floor(Math.random() * 5));

        // Target angle for the center of the winner's slice
        // Index 0 starts at 0, Index 1 at sliceAngle, etc.
        // To put index N at top, we rotate backward by N * sliceAngle?
        // Let's simplify: Just ensure we land SOMEWHERE.

        const randomOffset = Math.random() * sliceAngle * 0.8 - (sliceAngle * 0.4); // Add some randomness within the slice
        const targetRotation = extraSpins + (360 - (winnerIndex * sliceAngle)) + randomOffset;

        setRotation(targetRotation);

        // Wait for animation to finish
        setTimeout(() => {
            setStage('result');
        }, 4500); // 4.5s spin time
    };

    const resetGame = () => {
        setStage('input');
        setWinner(null);
        setRotation(0);
    };

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

            <div className="w-full max-w-md bg-gradient-to-br from-[#9F0013] via-[#D30019] to-[#80000D] rounded-3xl p-6 relative overflow-hidden shadow-2xl border-[3px] border-white/20 flex flex-col items-center min-h-[500px]">

                {/* Header */}
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Hesap Kimde? 💸</h2>
                <p className="text-white/70 text-sm mb-6 font-medium">Şanssız kişi hesabı öder!</p>

                {stage === 'input' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex-1 flex flex-col"
                    >
                        <form onSubmit={handleAddPlayer} className="relative mb-6">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="İsim girin..."
                                className="w-full bg-white/20 border-2 border-white/30 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors text-lg font-medium"
                                autoFocus
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
                            <button
                                type="submit"
                                disabled={!newName.trim() || players.length >= 12}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#9F0013] p-2 rounded-xl disabled:opacity-50 hover:scale-105 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                            {players.length >= 12 && <p className="text-xs text-white/60 mt-2 text-center">Maksimum kişi sayısına ulaşıldı.</p>}
                        </form>

                        <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2">
                            <div className="flex flex-wrap gap-2 justify-center">
                                <AnimatePresence>
                                    {players.map((player, index) => (
                                        <motion.div
                                            key={`${player}-${index}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            className="bg-black/30 backdrop-blur-sm pl-4 pr-2 py-2 rounded-xl flex items-center gap-2 text-white border border-white/10"
                                        >
                                            <span className="font-medium">{player}</span>
                                            <button
                                                onClick={() => removePlayer(index)}
                                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-white/70 hover:text-red-300" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {players.length === 0 && (
                                    <div className="text-white/40 text-center py-8 italic">
                                        Kimse yok mu? En az 2 kişi ekleyin.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={spinWheel}
                                disabled={players.length < 2}
                                className="w-full py-4 bg-white text-[#9F0013] font-black text-xl rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 uppercase tracking-wider"
                            >
                                Çevir Gelsin!
                            </button>
                        </div>
                    </motion.div>
                )}

                {stage !== 'input' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 w-full flex flex-col items-center justify-center relative"
                    >
                        {/* Pointer */}
                        <div className="absolute top-0 z-20 transform translate-y-2">
                            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white drop-shadow-lg" />
                        </div>

                        {/* Wheel Container */}
                        <div className="relative w-[300px] h-[300px] my-8">
                            <motion.div
                                className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
                                animate={{ rotate: rotation }}
                                transition={{ duration: 4.5, ease: [0.15, 0, 0, 1] }} // Custom bezier for spin effect
                            >
                                {players.map((player, index) => {
                                    const sliceAngle = 360 / players.length;
                                    const rotation = index * sliceAngle;
                                    // Making conical gradient slices is hard with pure CSS/Divs. 
                                    // Using standard conic-gradient is easier but hard to put text in.
                                    // Let's use rotated styled divs originating from center.

                                    return (
                                        <div
                                            key={index}
                                            className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-center"
                                            style={{
                                                transform: `rotate(${rotation - 90 + (sliceAngle / 2)}deg) skewY(-${90 - sliceAngle}deg)`, // Math is tricky here
                                                // Standard CSS Conic Gradient Approach simpler for background, but text placement is hard.
                                                // Let's try a simpler approach: 
                                                // Just a conic gradient background, and absolute positioned text labels.
                                                display: 'none' // Disabling this approach to try conic gradient below
                                            }}
                                        >
                                        </div>
                                    );
                                })}

                                {/* Conic Gradient Background */}
                                <div
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        background: `conic-gradient(${players.map((_, i) =>
                                            `${colors[i % colors.length]} ${i * (100 / players.length)}% ${(i + 1) * (100 / players.length)}%`
                                        ).join(', ')
                                            })`
                                    }}
                                />

                                {/* Text Labels */}
                                {players.map((player, index) => {
                                    const sliceAngle = 360 / players.length;
                                    const angle = (index * sliceAngle) + (sliceAngle / 2); // Center of slice
                                    const radius = 100; // Distance from center

                                    return (
                                        <div
                                            key={index}
                                            className="absolute top-1/2 left-1/2 w-full h-4 -mt-2 origin-center text-right pr-6"
                                            style={{
                                                transform: `rotate(${angle - 90}deg) translate(0, 0)`,
                                                // Text alignment logic: Rotate from center.
                                                // 'text-right' puts text at the outer edge if width is 50%? 
                                                // Let's set width 50% (radius) starting from center.
                                                width: '50%',
                                                left: '50%',
                                                transformOrigin: '0% 50%'
                                            }}
                                        >
                                            <span className="text-white font-bold text-sm drop-shadow-md truncate block w-full">
                                                {player}
                                            </span>
                                        </div>
                                    );
                                })}

                                {/* Center Cap */}
                                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center z-10">
                                    <div className="w-2 h-2 bg-[#9F0013] rounded-full" />
                                </div>
                            </motion.div>
                        </div>

                        {stage === 'result' && winner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 rounded-3xl"
                            >
                                <div className="bg-white p-8 rounded-3xl flex flex-col items-center shadow-2xl text-center m-4 animate-bounce-short">
                                    <h3 className="text-[#9F0013] font-bold text-xl uppercase tracking-widest mb-2">Hesap Sende!</h3>
                                    <div className="mt-4 text-4xl font-black text-black mb-6">
                                        {winner}
                                    </div>
                                    <button
                                        onClick={resetGame}
                                        className="bg-[#9F0013] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-colors"
                                    >
                                        Tekrar Oyna
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
