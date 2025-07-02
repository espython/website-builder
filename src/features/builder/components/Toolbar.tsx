'use client';

import { Download, Upload, Save, Undo, Redo, Settings } from 'lucide-react';
import { useSectionsStore } from '@/features/sections/store/sectionsStore';

const Toolbar = () => {
  const { exportSite, importSite, sections } = useSectionsStore((state) => ({
    exportSite: state.exportSite,
    importSite: state.importSite,
    sections: state.sections,
  }));

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
          importSite(json);
        } catch (error) {
          console.error('Failed to import file', error);
          alert('Failed to import file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExport = () => {
    exportSite();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold mr-6">Mini Website Builder</h1>
        <div className="flex space-x-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-md text-gray-600 flex items-center gap-1"
            onClick={handleImport}
          >
            <Upload size={16} />
            <span className="text-sm">Import</span>
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-md text-gray-600 flex items-center gap-1"
            onClick={handleExport}
            disabled={sections.length === 0}
          >
            <Download size={16} />
            <span className="text-sm">Export</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md text-gray-600 flex items-center gap-1">
            <Save size={16} />
            <span className="text-sm">Save</span>
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-600">
          <Undo size={16} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-600">
          <Redo size={16} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-600">
          <Settings size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
