'use client';

import { useState } from 'react';
import Stage from './components/Stage';
import IfGoButton from './components/IfGoButton';
import MasonryMenu from './components/MasonryMenu';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden font-sans">
      <Stage />

      {!isMenuOpen && (
        <IfGoButton onClick={() => setIsMenuOpen(true)} />
      )}

      <MasonryMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </main>
  );
}
