'use client';

import { useSectionsStore } from '../store/sectionsStore';
import { useShallow } from 'zustand/shallow';

// Get all sections
export const useSections = () => {
  return useSectionsStore(useShallow((state) => state.sections));
};

// Get selected section ID
export const useSelectedSectionId = () => {
  return useSectionsStore(useShallow((state) => state.selectedSectionId));
};

// Get selected section
export const useSelectedSection = () => {
  return useSectionsStore(
    useShallow((state) => {
      const { sections, selectedSectionId } = state;
      return (
        sections.find((section) => section.id === selectedSectionId) || null
      );
    })
  );
};

// Get section by ID
export const useSectionById = (id: string) => {
  return useSectionsStore(
    useShallow(
      (state) => state.sections.find((section) => section.id === id) || null
    )
  );
};

// Get section store actions as a bundle
export const useSectionActions = () => {
  return useSectionsStore(
    useShallow((state) => ({
      addSection: state.addSection,
      updateSection: state.updateSection,
      deleteSection: state.deleteSection,
      moveSectionUp: state.moveSectionUp,
      moveSectionDown: state.moveSectionDown,
      selectSection: state.selectSection,
      exportSite: state.exportSite,
      importSite: state.importSite,
    }))
  );
};

// Specific action hooks for simpler use cases
export const useAddSection = () =>
  useSectionsStore(useShallow((state) => state.addSection));
export const useUpdateSection = () =>
  useSectionsStore(useShallow((state) => state.updateSection));
export const useDeleteSection = () =>
  useSectionsStore(useShallow((state) => state.deleteSection));
export const useSelectSection = () =>
  useSectionsStore(useShallow((state) => state.selectSection));
export const useExportSite = () =>
  useSectionsStore(useShallow((state) => state.exportSite));
export const useImportSite = () =>
  useSectionsStore(useShallow((state) => state.importSite));

// Get section movement actions
export const useSectionMovementActions = () => {
  return useSectionsStore(
    useShallow((state) => ({
      moveSectionUp: state.moveSectionUp,
      moveSectionDown: state.moveSectionDown,
    }))
  );
};

// Get reordering action for drag and drop
export const useReorderSections = () =>
  useSectionsStore(useShallow((state) => state.reorderSections));

// NEW: Get undo/redo actions and state
export const useUndoRedo = () => {
  return useSectionsStore(
    useShallow((state) => ({
      undo: state.undo,
      redo: state.redo,
      canUndo: state.canUndo,
      canRedo: state.canRedo,
    }))
  );
};
