// src/providers/StoreProvider.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useSectionsStore } from '@/features/sections/store/sectionsStore';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once on client side
    if (!initialized.current) {
      // This tells Zustand to rehydrate from localStorage
      useSectionsStore.persist.rehydrate();
      initialized.current = true;
    }
  }, []);

  return <>{children}</>;
}
