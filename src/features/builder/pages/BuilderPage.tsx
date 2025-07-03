'use client';

import Toolbar from '@/features/builder/components/Toolbar';
import PreviewArea from '@/features/preview/components/PreviewArea';

const BuilderPage = () => {
  // const sections = useSectionsStore((state) => state.sections);

  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 border-r border-gray-200 overflow-y-auto">
          {/* Editor panel will go here */}
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
