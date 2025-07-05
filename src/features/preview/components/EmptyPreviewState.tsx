import React, { memo } from 'react';
import { ArrowDownUp } from 'lucide-react';
import AddSectionButton from '@/features/sections/components/AddSectionButton';

const EmptyPreviewState = memo(() => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center text-center justify-center p-8 max-w-md">
        <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
          <ArrowDownUp size={24} className="text-gray-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">
          Your website is empty
        </h3>
        <p className="text-gray-500 mb-4">
          Get started by adding sections from the editor panel.
        </p>
        <AddSectionButton />
      </div>
    </div>
  );
});

EmptyPreviewState.displayName = 'EmptyPreviewState';

export default EmptyPreviewState;
