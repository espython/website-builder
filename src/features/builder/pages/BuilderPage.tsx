'use client';

import Toolbar from '../components/Toolbar';
import PreviewArea from '@/features/preview/components/PreviewArea';
import SectionEditor from '../components/SectionEditor';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BuilderPage = () => {
  // State to control sidebar visibility on mobile
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar - hidden by default on mobile, toggleable, full width on mobile when visible */}
        <div
          className={`${sidebarVisible ? 'block' : 'hidden'} md:block border-r border-gray-200 bg-white
            w-full md:w-1/3 lg:w-1/4 overflow-y-auto
            ${sidebarVisible ? 'h-1/2 md:h-auto' : 'h-0'} 
            transition-all duration-300 ease-in-out`}
        >
          <SectionEditor />
        </div>

        {/* Toggle button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed bottom-4 right-4 z-10 bg-blue-500 text-white p-3 rounded-full shadow-lg"
          aria-label={sidebarVisible ? 'Hide editor' : 'Show editor'}
        >
          {sidebarVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {/* Preview area - full height on mobile when sidebar is hidden */}
        <div
          className={`flex-1 overflow-hidden ${!sidebarVisible ? 'h-full' : 'h-1/2 md:h-full'}`}
        >
          <PreviewArea />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
