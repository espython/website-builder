'use client';

import { GalleryContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface GallerySectionProps {
  content: GalleryContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const GallerySection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: GallerySectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field.startsWith('galleryItem-')) {
      // Handle gallery item caption updates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, itemIndex, subfield] = field.split('-');
      const index = parseInt(itemIndex, 10);

      if (updatedContent.items?.[index] && subfield === 'caption') {
        updatedContent.items[index].caption = value;
      }
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-7 px-4' : 'py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6'} bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
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
          className={`grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-3' : previewMode === 'tablet' ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6'}`}
        >
          {content.items?.map((item, index) => (
            <div
              key={item.id || index}
              className="relative group overflow-hidden rounded-lg shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.caption || `Gallery item ${index + 1}`}
                  className={`w-full ${previewMode === 'mobile' ? 'h-40' : previewMode === 'tablet' ? 'h-44' : 'h-48 sm:h-56 md:h-64'} object-cover transition-transform duration-300 group-hover:scale-110`}
                />
              )}
              {(item.caption || isSelected) && (
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 ${previewMode === 'mobile' ? 'p-1.5' : previewMode === 'tablet' ? 'p-2' : 'p-2 sm:p-3 md:p-4'} text-white`}
                >
                  <InlineEditableField
                    value={item.caption || `Image caption`}
                    onChange={(newValue) =>
                      handleFieldUpdate(
                        `galleryItem-${index}-caption`,
                        newValue
                      )
                    }
                    isEditable={isSelected && previewMode === 'desktop'}
                    className={`block ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                    placeholder="Add caption..."
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GallerySection;
