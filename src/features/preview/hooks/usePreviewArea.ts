import { useCallback } from 'react';
import {
  useSections,
  useSelectedSectionId,
  useSelectSection,
  useReorderSections,
} from '@/features/sections/hooks/sections-hook';
import { usePreviewMode, useSetPreviewMode } from './ui-hooks';
import { DragEndEvent } from '@dnd-kit/core';

export const usePreviewArea = () => {
  const sections = useSections();
  const selectedSectionId = useSelectedSectionId();
  const selectSection = useSelectSection();
  const reorderSections = useReorderSections();
  const previewMode = usePreviewMode();
  const setPreviewMode = useSetPreviewMode();

  // Handle drag end for section reordering
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        reorderSections(active.id as string, over.id as string);
      }
    },
    [reorderSections]
  );

  // Handle section selection
  const handleSectionSelect = useCallback(
    (id: string) => {
      selectSection(id);
    },
    [selectSection]
  );

  // Get container class for preview mode
  const getPreviewContainerClass = useCallback(() => {
    switch (previewMode) {
      case 'mobile':
        return 'mx-auto w-[360px] shadow-xl rounded-3xl';
      case 'tablet':
        return 'mx-auto w-[768px] shadow-xl rounded-2xl';
      case 'desktop':
      default:
        return 'mx-auto w-full max-w-6xl shadow-lg';
    }
  }, [previewMode]);

  // Change preview mode
  const handlePreviewModeChange = useCallback(
    (mode: 'mobile' | 'tablet' | 'desktop') => {
      setPreviewMode(mode);
    },
    [setPreviewMode]
  );

  return {
    sections,
    selectedSectionId,
    previewMode,
    handleDragEnd,
    handleSectionSelect,
    getPreviewContainerClass,
    handlePreviewModeChange,
  };
};
