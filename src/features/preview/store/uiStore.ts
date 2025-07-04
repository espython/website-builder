'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define preview mode type
export type PreviewMode = 'mobile' | 'tablet' | 'desktop';

// UI state interface
interface UIState {
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;
}

// Create UI store with persistence
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      previewMode: 'desktop', // Default preview mode
      setPreviewMode: (mode: PreviewMode) => set({ previewMode: mode }),
    }),
    {
      name: 'website-builder-ui-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      skipHydration: true,
    }
  )
);
