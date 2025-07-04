import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
}

interface ConfigState {
  // Project metadata
  currentProjectId: string | null;
  currentProjectName: string;
  currentProjectDescription: string;

  // Saved projects list
  savedProjects: Project[];

  // Configuration settings
  autoSave: boolean;
  autoSaveInterval: number; // in seconds
  previewMode: 'desktop' | 'mobile' | 'tablet';

  // Actions
  setCurrentProject: (
    id: string | null,
    name: string,
    description: string
  ) => void;
  createNewProject: (name: string, description: string) => void;
  saveProjectAs: (name: string, description: string) => void;
  deleteProject: (id: string) => void;
  updateProjectMetadata: (name: string, description: string) => void;
  setAutoSave: (enabled: boolean) => void;
  setAutoSaveInterval: (seconds: number) => void;
  setPreviewMode: (mode: 'desktop' | 'mobile' | 'tablet') => void;
}

export const useConfigStore = create<
  ConfigState,
  [['zustand/persist', ConfigState]]
>(
  persist(
    (set, get) => ({
      // Default state
      currentProjectId: null,
      currentProjectName: 'Untitled Project',
      currentProjectDescription: '',
      savedProjects: [],
      autoSave: false,
      autoSaveInterval: 60, // 1 minute
      previewMode: 'desktop',

      // Actions
      setCurrentProject: (id, name, description) =>
        set({
          currentProjectId: id,
          currentProjectName: name || 'Untitled Project',
          currentProjectDescription: description || '',
        }),

      createNewProject: (name, description) => {
        const id = uuidv4();
        const timestamp = Date.now();

        // Create new project and set as current
        set({
          currentProjectId: id,
          currentProjectName: name,
          currentProjectDescription: description || '',
          savedProjects: [
            ...get().savedProjects,
            {
              id,
              name,
              description,
              createdAt: timestamp,
              updatedAt: timestamp,
            },
          ],
        });
      },

      saveProjectAs: (name, description) => {
        const { currentProjectId, savedProjects } = get();
        const timestamp = Date.now();

        if (currentProjectId) {
          // Update existing project
          set({
            currentProjectName: name,
            currentProjectDescription: description || '',
            savedProjects: savedProjects.map((project) =>
              project.id === currentProjectId
                ? {
                    ...project,
                    name,
                    description,
                    updatedAt: timestamp,
                  }
                : project
            ),
          });
        } else {
          // Create new project
          const id = uuidv4();
          set({
            currentProjectId: id,
            currentProjectName: name,
            currentProjectDescription: description || '',
            savedProjects: [
              ...savedProjects,
              {
                id,
                name,
                description,
                createdAt: timestamp,
                updatedAt: timestamp,
              },
            ],
          });
        }
      },

      deleteProject: (id) =>
        set((state) => ({
          savedProjects: state.savedProjects.filter(
            (project) => project.id !== id
          ),
          currentProjectId:
            state.currentProjectId === id ? null : state.currentProjectId,
          currentProjectName:
            state.currentProjectId === id
              ? 'Untitled Project'
              : state.currentProjectName,
          currentProjectDescription:
            state.currentProjectId === id
              ? ''
              : state.currentProjectDescription,
        })),

      updateProjectMetadata: (name, description) =>
        set({
          currentProjectName: name,
          currentProjectDescription: description,
        }),

      setAutoSave: (enabled) => set({ autoSave: enabled }),
      setAutoSaveInterval: (seconds) => set({ autoSaveInterval: seconds }),
      setPreviewMode: (mode) => set({ previewMode: mode }),
    }),
    {
      name: 'website-builder-config',
    }
  )
);
