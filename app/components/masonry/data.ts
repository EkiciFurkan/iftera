
export type GameCategory = 'Bireysel' | 'Ekip' | 'IF Sokak Özel';

export interface Game {
    name: string;
    icon: string;
    color: string;
    category: GameCategory;
}

export const games: Game[] = [
    // Bireysel
    { name: 'Tetris', icon: '🧱', color: 'bg-cyan-500', category: 'Bireysel' },
    { name: 'Yılan', icon: '🐍', color: 'bg-green-500', category: 'Bireysel' },
    { name: 'Pacman', icon: '👻', color: 'bg-yellow-400', category: 'Bireysel' },
    { name: '2048', icon: '🔢', color: 'bg-orange-500', category: 'Bireysel' },
    { name: 'Sudoku', icon: '📝', color: 'bg-blue-500', category: 'Bireysel' },
    { name: 'Pinball', icon: '🎱', color: 'bg-pink-500', category: 'Bireysel' },

    // Ekip
    { name: 'Kartlar', icon: '🃏', color: 'bg-red-500', category: 'Ekip' },
    { name: 'Tabu', icon: '🗣️', color: 'bg-purple-500', category: 'Ekip' },
    { name: 'Quiz', icon: '❓', color: 'bg-indigo-500', category: 'Ekip' },

    // IF Sokak Özel
    { name: 'Satranç', icon: '♟️', color: 'bg-neutral-600', category: 'IF Sokak Özel' },
    { name: 'Dama', icon: '⚪', color: 'bg-stone-500', category: 'IF Sokak Özel' },
    { name: 'Okey', icon: '🀄', color: 'bg-amber-600', category: 'IF Sokak Özel' },
];

export const songs = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', votes: 24 },
    { id: 2, title: 'Levitating', artist: 'Dua Lipa', votes: 18 },
    { id: 3, title: 'Save Your Tears', artist: 'The Weeknd', votes: 15 },
    { id: 4, title: 'As It Was', artist: 'Harry Styles', votes: 12 },
    { id: 5, title: 'Flowers', artist: 'Miley Cyrus', votes: 9 },
];
