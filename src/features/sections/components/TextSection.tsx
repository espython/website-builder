'use client';

import { TextContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';

interface TextSectionProps {
  content: TextContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const TextSection = ({
  content,
  isSelected,
  onClick,
  id,
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
      className={`py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6 bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto max-w-4xl px-2 sm:px-4 lg:px-6">
        {content.title && (
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 text-center">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block"
              placeholder="Add a title..."
            />
          </h2>
        )}

        <div className="prose prose-base sm:prose-lg max-w-none text-gray-600">
          <InlineEditableField
            value={content.content}
            onChange={(newValue) => handleFieldUpdate('content', newValue)}
            isEditable={isSelected}
            className="block whitespace-pre-wrap"
            placeholder="Add your content here..."
          >
            <div className="whitespace-pre-wrap text-sm sm:text-base md:text-lg">
              {content.content}
            </div>
          </InlineEditableField>
        </div>
      </div>
    </Card>
  );
};

export default TextSection;
