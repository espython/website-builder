'use client';

import { useUIStore, PreviewMode } from '../store/uiStore';

/**
 * Hook to get the current preview mode
 * @returns The current preview mode (mobile, tablet, desktop)
 */
export const usePreviewMode = (): PreviewMode => {
  return useUIStore((state) => state.previewMode);
};

/**
 * Hook to set the preview mode
 * @returns A function to set the preview mode
 */
export const useSetPreviewMode = (): ((mode: PreviewMode) => void) => {
  return useUIStore((state) => state.setPreviewMode);
};
