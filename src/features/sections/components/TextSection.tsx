'use client';

import { TextContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface TextSectionProps {
  content: TextContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const TextSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: TextSectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'content') {
      updatedContent.content = value;
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`${previewMode === 'mobile' ? 'py-4 px-3' : previewMode === 'tablet' ? 'py-6 px-4' : 'py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6'} bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto max-w-4xl ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4 lg:px-6'}`}
      >
        {content.title && (
          <h2
            className={`${previewMode === 'mobile' ? 'text-xl' : previewMode === 'tablet' ? 'text-2xl' : 'text-2xl sm:text-2xl md:text-3xl'} font-bold text-gray-800 ${previewMode === 'mobile' ? 'mb-3' : previewMode === 'tablet' ? 'mb-4' : 'mb-4 sm:mb-5 md:mb-6'} text-center`}
          >
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
              className="inline-block"
              placeholder="Add a title..."
            />
          </h2>
        )}

        <div
          className={`prose ${previewMode === 'mobile' ? 'prose-sm' : previewMode === 'tablet' ? 'prose-base' : 'prose-base sm:prose-lg'} max-w-none text-gray-600`}
        >
          <InlineEditableField
            value={content.content}
            onChange={(newValue) => handleFieldUpdate('content', newValue)}
            isEditable={isSelected && previewMode === 'desktop'}
            className="block whitespace-pre-wrap"
            placeholder="Add your content here..."
          >
            <div
              className={`whitespace-pre-wrap ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base md:text-lg'}`}
            >
              {content.content}
            </div>
          </InlineEditableField>
        </div>
      </div>
    </Card>
  );
};

export default TextSection;
