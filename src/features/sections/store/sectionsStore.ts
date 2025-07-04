'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Section, SectionType, SectionContent } from '../types/section';

export interface SiteExportData {
  projectId: string;
  projectName: string;
  version: string;
  exportDate: string;
  sections: Section[];
}

interface HistoryState {
  sections: Section[];
  selectedSectionId: string | null;
}

interface SectionsState {
  sections: Section[];
  selectedSectionId: string | null;
  history: HistoryState[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  addSection: (type: SectionType, content: SectionContent) => void;
  updateSection: (id: string, content: SectionContent) => void;
  deleteSection: (id: string) => void;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  exportSite: (projectName?: string) => void;
  importSite: (data: SiteExportData | { sections: Section[] }) => void;
  selectSection: (id: string) => void;
  clearSections: () => void;
  getSectionById: (id: string) => Section | undefined;
  getSectionsByType: (type: SectionType) => Section[];
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}

export const useSectionsStore = create<SectionsState>()(
  persist(
    (set, get) => ({
      sections: [],
      selectedSectionId: null,
      history: [],
      historyIndex: -1,
      canUndo: false,
      canRedo: false,
      saveToHistory: () => {
        const { sections, selectedSectionId, history, historyIndex } = get();
        const newHistoryState: HistoryState = {
          sections: JSON.parse(JSON.stringify(sections)),
          selectedSectionId,
        };
        const newHistory = history.slice(0, historyIndex + 1);
        set({
          history: [...newHistory, newHistoryState],
          historyIndex: newHistory.length,
          canUndo: true,
          canRedo: false,
        });
      },
      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex <= 0) return;
        const newIndex = historyIndex - 1;
        const previousState = history[newIndex];
        set({
          sections: previousState.sections,
          selectedSectionId: previousState.selectedSectionId,
          historyIndex: newIndex,
          canUndo: newIndex > 0,
          canRedo: true,
        });
      },
      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex >= history.length - 1) return;
        const newIndex = historyIndex + 1;
        const nextState = history[newIndex];
        set({
          sections: nextState.sections,
          selectedSectionId: nextState.selectedSectionId,
          historyIndex: newIndex,
          canUndo: true,
          canRedo: newIndex < history.length - 1,
        });
      },
      addSection: (type, content) => {
        get().saveToHistory();
        const newSection: Section = {
          id: uuidv4(),
          type,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          sections: [...state.sections, newSection],
          selectedSectionId: newSection.id,
        }));
      },
      updateSection: (id, content) => {
        get().saveToHistory();
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id
              ? { ...section, content, updatedAt: new Date().toISOString() }
              : section
          ),
        }));
      },
      deleteSection: (id) => {
        get().saveToHistory();
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
        get().saveToHistory();
        set((state) => {
          const index = state.sections.findIndex(
            (section) => section.id === id
          );
          if (index <= 0) return state;
          const newSections = [...state.sections];
          const temp = newSections[index];
          newSections[index] = newSections[index - 1];
          newSections[index - 1] = temp;
          return { sections: newSections };
        });
      },
      moveSectionDown: (id) => {
        get().saveToHistory();
        set((state) => {
          const index = state.sections.findIndex(
            (section) => section.id === id
          );
          if (index === -1 || index >= state.sections.length - 1) return state;
          const newSections = [...state.sections];
          const temp = newSections[index];
          newSections[index] = newSections[index + 1];
          newSections[index + 1] = temp;
          return { sections: newSections };
        });
      },
      reorderSections: (activeId, overId) => {
        get().saveToHistory();
        set((state) => {
          const oldIndex = state.sections.findIndex(
            (section) => section.id === activeId
          );
          const newIndex = state.sections.findIndex(
            (section) => section.id === overId
          );
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
            return state;
          const newSections = [...state.sections];
          const [movedSection] = newSections.splice(oldIndex, 1);
          newSections.splice(newIndex, 0, movedSection);
          return { sections: newSections };
        });
      },
      exportSite: (projectName = 'website') => {
        if (typeof window === 'undefined') return;
        const { sections } = get();
        const exportData: SiteExportData = {
          projectId: `export-${Date.now()}`,
          projectName: projectName,
          version: '1.0.0',
          exportDate: new Date().toISOString(),
          sections,
        };
        const data = JSON.stringify(exportData, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return exportData;
      },
      importSite: (data) => {
        get().saveToHistory();
        if ('sections' in data && Array.isArray(data.sections)) {
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
      clearSections: () => {
        get().saveToHistory();
        set(() => ({
          sections: [],
          selectedSectionId: null,
        }));
      },
      getSectionById: (id) => {
        return get().sections.find((section) => section.id === id);
      },
      getSectionsByType: (type) => {
        return get().sections.filter((section) => section.type === type);
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
      skipHydration: true,
    }
  )
);
