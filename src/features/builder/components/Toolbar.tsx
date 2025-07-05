'use client';

import { Undo, Redo, Settings, Menu } from 'lucide-react';
import ProjectManager from './ProjectManager';
import { Button } from '@/shared/components/ui/button';
import { useUndoRedo } from '@/features/sections/hooks/sections-hook';
import { useState } from 'react';

const Toolbar = () => {
  // Use the undo/redo hooks
  const { undo, redo, canUndo, canRedo } = useUndoRedo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-2 sm:px-4 py-2">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
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

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-lg font-bold">Website Builder</h1>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile expanded menu */}
        {mobileMenuOpen && (
          <div className="mt-2 pb-2 border-t border-gray-100 pt-2">
            <div className="mb-3">
              <ProjectManager />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2"
                  title="Undo"
                  onClick={undo}
                  disabled={!canUndo}
                >
                  <Undo size={16} />
                  <span className="ml-1 text-xs">Undo</span>
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
                  <span className="ml-1 text-xs">Redo</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                title="Settings"
              >
                <Settings size={16} />
                <span className="ml-1 text-xs">Settings</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
