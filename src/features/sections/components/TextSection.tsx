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
      className={`py-12 px-6 bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto max-w-4xl">
        {content.title && (
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block"
              placeholder="Add a title..."
            />
          </h2>
        )}

        <div className="prose prose-lg max-w-none">
          <InlineEditableField
            value={content.content}
            onChange={(newValue) => handleFieldUpdate('content', newValue)}
            isEditable={isSelected}
            className="block whitespace-pre-wrap"
            placeholder="Add your content here..."
          >
            <div className="whitespace-pre-wrap">{content.content}</div>
          </InlineEditableField>
        </div>
      </div>
    </Card>
  );
};

export default TextSection;
