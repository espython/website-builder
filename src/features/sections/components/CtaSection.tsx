'use client';

import { CTAContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { InlineEditableField } from './common/InlineEditableField';

interface CtaSectionProps {
  content: CTAContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const CtaSection = ({ content, isSelected, onClick, id }: CtaSectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field === 'buttonText') {
      updatedContent.buttonText = value;
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`py-16 px-8 bg-blue-600 relative overflow-hidden cursor-pointer ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
      style={
        content.backgroundImage
          ? {
              backgroundImage: `url(${content.backgroundImage})`,
            }
          : {}
      }
    >
      {/* Dark overlay for image backgrounds */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block text-white"
            />
          </h2>

          {content.description && (
            <p className="text-lg md:text-xl mb-8 text-white text-opacity-90">
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected}
                className="inline-block text-white text-opacity-90"
              />
            </p>
          )}

          {content.buttonText && (
            <Button
              variant="default"
              size="lg"
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3 text-lg transition-colors shadow-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <InlineEditableField
                value={content.buttonText}
                onChange={(newValue) =>
                  handleFieldUpdate('buttonText', newValue)
                }
                isEditable={isSelected}
              />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CtaSection;
