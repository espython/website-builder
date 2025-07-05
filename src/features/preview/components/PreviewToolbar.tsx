import React, { memo } from 'react';
import { Smartphone, Tablet, Monitor, Eye } from 'lucide-react';

interface PreviewToolbarProps {
  previewMode: 'mobile' | 'tablet' | 'desktop';
  onModeChange: (mode: 'mobile' | 'tablet' | 'desktop') => void;
}

const PreviewToolbar = memo(
  ({ previewMode, onModeChange }: PreviewToolbarProps) => {
    return (
      <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-500">Preview</div>
        <div className="flex space-x-2">
          <button
            onClick={() => onModeChange('mobile')}
            className={`p-1.5 rounded-md ${
              previewMode === 'mobile'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Mobile view"
          >
            <Smartphone size={18} />
          </button>
          <button
            onClick={() => onModeChange('tablet')}
            className={`p-1.5 rounded-md ${
              previewMode === 'tablet'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Tablet view"
          >
            <Tablet size={18} />
          </button>
          <button
            onClick={() => onModeChange('desktop')}
            className={`p-1.5 rounded-md ${
              previewMode === 'desktop'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Desktop view"
          >
            <Monitor size={18} />
          </button>
          <div className="border-l border-gray-200 mx-2 h-6" />
          <button
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
            title="Preview in new tab"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>
    );
  }
);

PreviewToolbar.displayName = 'PreviewToolbar';

export default PreviewToolbar;
