'use client';

import { useSelectedSectionId } from '@/features/sections/hooks/sections-hook';
import Toolbar from '../components/Toolbar';
import PreviewArea from '@/features/preview/components/PreviewArea';

const BuilderPage = () => {
  // Using our custom hooks for optimized rendering
  const selectedSectionId = useSelectedSectionId();

  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 border-r border-gray-200 overflow-y-auto bg-white">
          {/* Editor Panel will go here */}
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Editor Panel
            </h3>
            {selectedSectionId ? (
              <p className="text-sm text-gray-500">
                Edit the selected section (ID:{' '}
                {selectedSectionId.substring(0, 8)}...)
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Select a section in the preview area to edit its properties
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
