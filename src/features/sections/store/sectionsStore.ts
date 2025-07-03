'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Section, SectionType, SectionContent } from '../types/section';

interface SectionsState {
  sections: Section[];
  selectedSectionId: string | null;
  addSection: (type: SectionType, content: SectionContent) => void;
  updateSection: (id: string, content: SectionContent) => void;
  deleteSection: (id: string) => void;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  exportSite: () => void;
  importSite: (data: { sections: Section[] }) => void;
  selectSection: (id: string) => void;
}

export const useSectionsStore = create<SectionsState>()(
  persist(
    (set, get) => ({
      sections: [],
      selectedSectionId: null,

      addSection: (type, content) => {
        const newSection: Section = {
          id: uuidv4(),
          type,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          sections: [...state.sections, newSection],
          selectedSectionId: newSection.id, // Auto-select newly added section
        }));
      },

      updateSection: (id, content) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id
              ? { ...section, content, updatedAt: new Date().toISOString() }
              : section
          ),
        }));
      },

      deleteSection: (id) => {
        set((state) => {
          const newSections = state.sections.filter(
            (section) => section.id !== id
          );
          const newSelectedId =
            state.selectedSectionId === id
              ? newSections.length > 0
                ? newSections[0].id
                : null
              : state.selectedSectionId;

          return {
            sections: newSections,
            selectedSectionId: newSelectedId,
          };
        });
      },

      moveSectionUp: (id) => {
        set((state) => {
          const index = state.sections.findIndex(
            (section) => section.id === id
          );
          if (index <= 0) return state; // Already at the top

          const newSections = [...state.sections];
          const temp = newSections[index];
          newSections[index] = newSections[index - 1];
          newSections[index - 1] = temp;

          return { sections: newSections };
        });
      },

      moveSectionDown: (id) => {
        set((state) => {
          const index = state.sections.findIndex(
            (section) => section.id === id
          );
          if (index === -1 || index >= state.sections.length - 1) return state; // Already at the bottom

          const newSections = [...state.sections];
          const temp = newSections[index];
          newSections[index] = newSections[index + 1];
          newSections[index + 1] = temp;

          return { sections: newSections };
        });
      },

      exportSite: () => {
        if (typeof window === 'undefined') return; // Guard for server-side

        const { sections } = get();
        const data = JSON.stringify({ sections }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `website-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup URL object
        URL.revokeObjectURL(url);
      },

      importSite: (data) => {
        if (data && Array.isArray(data.sections)) {
          set(() => ({
            sections: data.sections,
            selectedSectionId:
              data.sections.length > 0 ? data.sections[0].id : null,
          }));
        }
      },

      selectSection: (id) => {
        set(() => ({
          selectedSectionId: id,
        }));
      },
    }),
    {
      name: 'website-builder-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      skipHydration: true, // Let our StoreProvider handle hydration
    }
  )
);
