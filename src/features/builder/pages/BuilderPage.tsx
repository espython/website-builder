'use client';

import Toolbar from '../components/Toolbar';
import PreviewArea from '@/features/preview/components/PreviewArea';
import SectionEditor from '../components/SectionEditor';

const BuilderPage = () => {
  // Using our custom hooks for optimized rendering
  // const selectedSectionId = useSelectedSectionId();

  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 border-r border-gray-200 overflow-y-auto bg-white">
          <SectionEditor />
        </div>
        <div className="flex-1 overflow-hidden">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
