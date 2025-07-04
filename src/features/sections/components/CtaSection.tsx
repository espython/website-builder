'use client';

import { CTAContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { InlineEditableField } from './common/InlineEditableField';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface CtaSectionProps {
  content: CTAContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const CtaSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: CtaSectionProps) => {
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
      className={`${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-8 px-4' : 'py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8'} bg-blue-600 relative overflow-hidden cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
      style={
        content.backgroundImage
          ? {
              backgroundImage: `url(${content.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Dark overlay for image backgrounds */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      <div
        className={`container mx-auto ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4'} relative z-10`}
      >
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-center">
          <h2
            className={`${previewMode === 'mobile' ? 'text-xl' : previewMode === 'tablet' ? 'text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-bold ${previewMode === 'mobile' ? 'mb-3' : previewMode === 'tablet' ? 'mb-4' : 'mb-4 sm:mb-5 md:mb-6'} text-white`}
          >
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
              className="inline-block text-white"
            />
          </h2>

          {content.description && (
            <p
              className={`${previewMode === 'mobile' ? 'text-sm' : previewMode === 'tablet' ? 'text-base' : 'text-base sm:text-lg md:text-xl'} ${previewMode === 'mobile' ? 'mb-4' : previewMode === 'tablet' ? 'mb-5' : 'mb-6 sm:mb-7 md:mb-8'} text-white text-opacity-90`}
            >
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected && previewMode === 'desktop'}
                className="inline-block text-white text-opacity-90"
              />
            </p>
          )}

          {content.buttonText && (
            <Button
              variant="default"
              size={previewMode === 'mobile' ? 'sm' : 'lg'}
              className={`bg-white hover:bg-gray-100 text-blue-600 font-medium ${previewMode === 'mobile' ? 'text-xs px-4 py-1' : previewMode === 'tablet' ? 'text-sm px-5 py-2' : 'text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-2.5 sm:py-3'} transition-colors shadow-md`}
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
                isEditable={isSelected && previewMode === 'desktop'}
              />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CtaSection;
