'use client';

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Section, SectionType, SectionContent } from '../types/section';

interface SectionsState {
  sections: Section[];
  addSection: (type: SectionType, content: SectionContent) => void;
  updateSection: (id: string, content: SectionContent) => void;
  deleteSection: (id: string) => void;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  exportSite: () => void;
  importSite: (data: { sections: Section[] }) => void;
}

export const useSectionsStore = create<SectionsState>((set, get) => ({
  sections: [],

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
    }));
  },

  updateSection: (id, content) => {
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id
          ? {
              ...section,
              content,
              updatedAt: new Date().toISOString(),
            }
          : section
      ),
    }));
  },

  deleteSection: (id) => {
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    }));
  },

  moveSectionUp: (id) => {
    set((state) => {
      const sections = [...state.sections];
      const index = sections.findIndex((section) => section.id === id);
      if (index <= 0) return state;

      const temp = sections[index];
      sections[index] = sections[index - 1];
      sections[index - 1] = temp;

      return { sections };
    });
  },

  moveSectionDown: (id) => {
    set((state) => {
      const sections = [...state.sections];
      const index = sections.findIndex((section) => section.id === id);
      if (index === -1 || index === sections.length - 1) return state;

      const temp = sections[index];
      sections[index] = sections[index + 1];
      sections[index + 1] = temp;

      return { sections };
    });
  },

  exportSite: () => {
    const { sections } = get();
    const dataStr = JSON.stringify({ sections }, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportName = `website-${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  },

  importSite: (data) => {
    if (data && Array.isArray(data.sections)) {
      set({ sections: data.sections });
    }
  },
}));
