'use client';

import { Undo, Redo, Settings } from 'lucide-react';
import ProjectManager from './ProjectManager';
import { Button } from '@/shared/components/ui/button';
import { useUndoRedo } from '@/features/sections/hooks/sections-hook';

const Toolbar = () => {
  // Use the undo/redo hooks
  const { undo, redo, canUndo, canRedo } = useUndoRedo();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-6">Website Builder</h1>
        <ProjectManager />
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          title="Undo"
          onClick={undo}
          disabled={!canUndo}
        >
          <Undo size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          title="Redo"
          onClick={redo}
          disabled={!canRedo}
        >
          <Redo size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="p-2" title="Settings">
          <Settings size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
