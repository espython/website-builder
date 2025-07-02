'use client';

import { useState } from 'react';
import EditorPanel from '@/features/editor/components/EditorPanel';
import PreviewArea from '@/features/preview/components/PreviewArea';
import Toolbar from '@/features/builder/components/Toolbar';
import { useSectionsStore } from '@/features/sections/store/sectionsStore';

const BuilderPage = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const sections = useSectionsStore((state) => state.sections);

  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
  };

  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 border-r border-gray-200 overflow-y-auto">
          <EditorPanel
            selectedSectionId={selectedSectionId}
            onSelectSection={handleSelectSection}
          />
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <PreviewArea
            sections={sections}
            selectedSectionId={selectedSectionId}
            onSelectSection={handleSelectSection}
          />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
