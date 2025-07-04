'use client';

import { FeaturesContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface FeaturesSectionProps {
  content: FeaturesContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const FeaturesSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: FeaturesSectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field.startsWith('feature-')) {
      // Handle feature item updates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, itemIndex, subfield] = field.split('-');
      const index = parseInt(itemIndex, 10);

      if (updatedContent.items?.[index]) {
        if (subfield === 'title') {
          updatedContent.items[index].title = value;
        } else if (subfield === 'description') {
          updatedContent.items[index].description = value;
        }
      }
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-8 px-4' : 'py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8'} bg-white cursor-pointer rounded-none ${isSelected ? 'outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4'}`}
      >
        <div
          className={`text-center ${previewMode === 'mobile' ? 'mb-5' : previewMode === 'tablet' ? 'mb-6' : 'mb-8 sm:mb-10 md:mb-12'}`}
        >
          <h2
            className={`${previewMode === 'mobile' ? 'text-xl' : previewMode === 'tablet' ? 'text-2xl' : 'text-2xl sm:text-2xl md:text-3xl'} font-bold ${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
          >
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p
              className={`${previewMode === 'mobile' ? 'text-sm' : previewMode === 'tablet' ? 'text-base' : 'text-base sm:text-lg'} text-gray-600 max-w-2xl mx-auto`}
            >
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected && previewMode === 'desktop'}
                className="inline-block"
              />
            </p>
          )}
        </div>

        <div
          className={`grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-3' : previewMode === 'tablet' ? 'grid-cols-2 gap-4' : 'grid-cols-3 gap-8'}`}
        >
          {content.items?.map((item, index) => (
            <Card
              key={item.id || index}
              className={`${previewMode === 'mobile' ? 'p-3' : previewMode === 'tablet' ? 'p-4' : 'p-4 sm:p-5 md:p-6'} flex flex-col h-full hover:shadow-md transition-shadow`}
              onClick={(e) => e.stopPropagation()}
            >
              {item.icon && (
                <div className="text-blue-500 mb-3 sm:mb-4">
                  <div
                    className={`${previewMode === 'mobile' ? 'w-8 h-8' : previewMode === 'tablet' ? 'w-9 h-9' : 'w-10 h-10 sm:w-12 sm:h-12'} rounded-full bg-blue-100 flex items-center justify-center`}
                  >
                    <span
                      className={`${previewMode === 'mobile' ? 'text-lg' : previewMode === 'tablet' ? 'text-xl' : 'text-xl sm:text-2xl'}`}
                    >
                      {item.icon}
                    </span>
                  </div>
                </div>
              )}
              <h3
                className={`${previewMode === 'mobile' ? 'text-base' : previewMode === 'tablet' ? 'text-lg' : 'text-lg sm:text-xl'} font-semibold ${previewMode === 'mobile' ? 'mb-1' : 'mb-2 sm:mb-3'}`}
              >
                <InlineEditableField
                  value={item.title}
                  onChange={(newValue) =>
                    handleFieldUpdate(`feature-${index}-title`, newValue)
                  }
                  isEditable={isSelected && previewMode === 'desktop'}
                  className="inline-block"
                />
              </h3>
              <p
                className={`${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'} text-gray-600`}
              >
                <InlineEditableField
                  value={item.description}
                  onChange={(newValue) =>
                    handleFieldUpdate(`feature-${index}-description`, newValue)
                  }
                  isEditable={isSelected && previewMode === 'desktop'}
                  className="inline-block"
                />
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default FeaturesSection;
