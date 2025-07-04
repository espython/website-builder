'use client';

import React, { useState } from 'react';
import { useConfigStore } from '../store/configStore';
import { useSectionsStore } from '@/features/sections/store/sectionsStore';
import { Save, Trash2, FolderOpen, Download, Upload, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'save' | 'load' | 'new';
}

const ProjectModal = ({ isOpen, onClose, mode }: ProjectModalProps) => {
  const { savedProjects, saveProjectAs, createNewProject, deleteProject } =
    useConfigStore();
  const { exportSite, clearSections } = useSectionsStore();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  if (!isOpen) return null;

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    // For new project, clear existing sections first
    if (mode === 'new') {
      clearSections();
      createNewProject(projectName, projectDescription);
    } else if (mode === 'save') {
      // Export project with the name and save metadata
      exportSite(projectName);
      saveProjectAs(projectName, projectDescription);
    }

    setProjectName('');
    setProjectDescription('');
    onClose();
  };

  const handleLoadProject = (projectId: string) => {
    // Here we would need to implement loading from persistent storage
    // For now, we're just simulating the behavior
    alert(`Loading project ${projectId} (implementation needed)`);
    onClose();
  };

  const handleDeleteProject = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  const modalTitle =
    mode === 'save'
      ? 'Save Project'
      : mode === 'load'
        ? 'Load Project'
        : 'New Project';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        {(mode === 'save' || mode === 'new') && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleCreateProject}
                disabled={!projectName.trim()}
              >
                {mode === 'save' ? 'Save' : 'Create'}
              </Button>
            </DialogFooter>
          </div>
        )}

        {mode === 'load' && (
          <div className="space-y-4">
            {savedProjects.length === 0 ? (
              <DialogDescription className="text-center py-6">
                No saved projects yet.
              </DialogDescription>
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-3">
                {savedProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleLoadProject(project.id)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          {project.name}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteProject(project.id, e)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-transparent"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    {project.description && (
                      <CardContent className="p-4 pt-0 pb-2">
                        <p className="text-sm text-slate-600">
                          {project.description}
                        </p>
                      </CardContent>
                    )}
                    <CardFooter className="p-4 pt-1">
                      <p className="text-xs text-slate-400">
                        Last updated:{' '}
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ProjectManager: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'save' | 'load' | 'new'>('save');

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          useSectionsStore.getState().importSite(json);
          alert('Project imported successfully!');
        } catch (error) {
          console.error('Failed to import file', error);
          alert('Failed to import file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const openModal = (mode: 'save' | 'load' | 'new') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => openModal('new')}
          title="New Project"
        >
          <Plus size={16} />
          <span className="text-sm">New</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => openModal('save')}
          title="Save Project"
        >
          <Save size={16} />
          <span className="text-sm">Save</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => openModal('load')}
          title="Load Project"
        >
          <FolderOpen size={16} />
          <span className="text-sm">Load</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => useSectionsStore.getState().exportSite()}
          title="Export Project"
        >
          <Download size={16} />
          <span className="text-sm">Export</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleImport}
          title="Import Project"
        >
          <Upload size={16} />
          <span className="text-sm">Import</span>
        </Button>
      </div>

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </>
  );
};

export default ProjectManager;
