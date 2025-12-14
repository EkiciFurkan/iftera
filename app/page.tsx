'use client';

import { useState } from 'react';
import Stage from './components/Stage';
import MasonryMenu from './components/MasonryMenu';
import AvatarStore from './components/AvatarStore';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  return (
      <main className="relative min-h-screen w-full bg-[#FAFAFA] overflow-hidden font-sans">
          
          <Stage onIfGoClick={() => setIsMenuOpen(true)}/>

          <MasonryMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onProfileClick={() => {
                  setIsMenuOpen(false);
                  setIsStoreOpen(true);
              }}
          />

          <AnimatePresence>
              {isStoreOpen && (
                  <AvatarStore onBack={() => setIsStoreOpen(false)}/>
              )}
          </AnimatePresence>


      </main>
  );
}
