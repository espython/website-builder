'use client';

import { FooterContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { Button } from '@/shared/components/ui/button';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface FooterSectionProps {
  content: FooterContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const FooterSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: FooterSectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'logo') {
      updatedContent.logo.text = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field === 'copyright') {
      updatedContent.copyright = value;
    } else if (field.startsWith('column-')) {
      // Handle column title updates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, columnIndex, subfield] = field.split('-');
      const index = parseInt(columnIndex, 10);

      if (subfield === 'title' && updatedContent.linkGroups?.[index]) {
        updatedContent.linkGroups[index].title = value;
      }
    } else if (field.startsWith('link-')) {
      // Handle link label updates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, columnIndex, linkIndex, subfield] = field.split('-');
      const colIndex = parseInt(columnIndex, 10);
      const lnkIndex = parseInt(linkIndex, 10);

      if (
        subfield === 'label' &&
        updatedContent.linkGroups?.[colIndex]?.links?.[lnkIndex]
      ) {
        updatedContent.linkGroups[colIndex].links[lnkIndex].label = value;
      }
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`bg-gray-900 text-white ${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-7 px-4' : 'py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6'} cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4'}`}
      >
        <div
          className={`grid grid-cols-1 ${previewMode === 'mobile' ? 'gap-5' : previewMode === 'tablet' ? 'sm:grid-cols-2 gap-5' : 'sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8'}`}
        >
          {/* Logo and description */}
          <div
            className={`${previewMode === 'mobile' || previewMode === 'tablet' ? '' : 'md:col-span-1'}`}
          >
            <div
              className={`${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
            >
              {content.logo?.image ? (
                <div className="flex items-center">
                  <img
                    src={content.logo?.image}
                    alt="Logo"
                    className={`${previewMode === 'mobile' ? 'h-5' : previewMode === 'tablet' ? 'h-6' : 'h-6 sm:h-7 md:h-8'} w-auto`}
                  />
                </div>
              ) : (
                <div
                  className={`${previewMode === 'mobile' ? 'text-base' : previewMode === 'tablet' ? 'text-lg' : 'text-lg sm:text-xl'} font-bold`}
                >
                  <InlineEditableField
                    value={content.logo?.text || 'Website Name'}
                    onChange={(newValue) => handleFieldUpdate('logo', newValue)}
                    isEditable={isSelected && previewMode === 'desktop'}
                    className="text-white"
                  />
                </div>
              )}
            </div>
            {content.description && (
              <p
                className={`${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'} text-gray-400 ${previewMode === 'mobile' ? 'mb-3' : previewMode === 'tablet' ? 'mb-4' : 'mb-4 sm:mb-6'}`}
              >
                <InlineEditableField
                  value={content.description}
                  onChange={(newValue) =>
                    handleFieldUpdate('description', newValue)
                  }
                  isEditable={isSelected && previewMode === 'desktop'}
                  className="text-gray-400"
                />
              </p>
            )}
          </div>

          {/* Footer Columns */}
          {content.linkGroups?.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`${previewMode === 'mobile' || previewMode === 'tablet' ? '' : 'md:col-span-1'}`}
            >
              <h3
                className={`${previewMode === 'mobile' ? 'text-sm' : previewMode === 'tablet' ? 'text-base' : 'text-base sm:text-lg'} font-semibold ${previewMode === 'mobile' ? 'mb-1.5' : 'mb-2 sm:mb-3'}`}
              >
                <InlineEditableField
                  value={column.title}
                  onChange={(newValue) =>
                    handleFieldUpdate(`column-${columnIndex}-title`, newValue)
                  }
                  isEditable={isSelected && previewMode === 'desktop'}
                  className="text-white"
                />
              </h3>
              <div
                className={`flex flex-col ${previewMode === 'mobile' ? 'space-y-1' : previewMode === 'tablet' ? 'space-y-1.5' : 'space-y-1.5 sm:space-y-2'}`}
              >
                {column.links?.map((link, linkIndex) => (
                  <Button
                    key={linkIndex}
                    variant="link"
                    className={`${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'} text-gray-400 hover:text-white transition-colors justify-start p-0 h-auto`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <InlineEditableField
                      value={link.label}
                      onChange={(newValue) =>
                        handleFieldUpdate(
                          `link-${columnIndex}-${linkIndex}-label`,
                          newValue
                        )
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="text-inherit"
                    />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        {content.copyright && (
          <div
            className={`border-t border-gray-800 ${previewMode === 'mobile' ? 'mt-5 pt-5' : previewMode === 'tablet' ? 'mt-6 pt-6' : 'mt-6 sm:mt-8 pt-6 sm:pt-8'} text-center text-gray-400 ${previewMode === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm'}`}
          >
            <InlineEditableField
              value={content.copyright}
              onChange={(newValue) => handleFieldUpdate('copyright', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
              className="text-inherit"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default FooterSection;
