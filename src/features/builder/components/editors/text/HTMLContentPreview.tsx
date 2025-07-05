import React, { memo } from 'react';

interface HTMLContentPreviewProps {
  content: string;
}

const HTMLContentPreview = memo(({ content }: HTMLContentPreviewProps) => {
  if (!content) return null;

  return (
    <div className="border border-gray-200 p-4 rounded-md">
      <h4 className="text-sm font-medium text-gray-500 mb-2">Preview:</h4>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
});

HTMLContentPreview.displayName = 'HTMLContentPreview';

export default HTMLContentPreview;
