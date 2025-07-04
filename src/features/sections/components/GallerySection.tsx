'use client';

import { GalleryContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';

interface GallerySectionProps {
  content: GalleryContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const GallerySection = ({
  content,
  isSelected,
  onClick,
  id,
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
      className={`py-12 px-6 bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected}
                className="inline-block"
              />
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
              {(item.caption || isSelected) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white">
                  <InlineEditableField
                    value={item.caption || `Image caption`}
                    onChange={(newValue) =>
                      handleFieldUpdate(
                        `galleryItem-${index}-caption`,
                        newValue
                      )
                    }
                    isEditable={isSelected}
                    className="block"
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
