'use client';

import { FooterContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { Button } from '@/shared/components/ui/button';

interface FooterSectionProps {
  content: FooterContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const FooterSection = ({
  content,
  isSelected,
  onClick,
  id,
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
      className={`bg-gray-900 text-white py-12 px-6 cursor-pointer ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              {content.logo?.image ? (
                <div className="flex items-center">
                  <img
                    src={content.logo?.image}
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </div>
              ) : (
                <div className="text-xl font-bold">
                  <InlineEditableField
                    value={content.logo?.text || 'Website Name'}
                    onChange={(newValue) => handleFieldUpdate('logo', newValue)}
                    isEditable={isSelected}
                    className="text-white"
                  />
                </div>
              )}
            </div>
            {content.description && (
              <p className="text-gray-400 mb-6">
                <InlineEditableField
                  value={content.description}
                  onChange={(newValue) =>
                    handleFieldUpdate('description', newValue)
                  }
                  isEditable={isSelected}
                  className="text-gray-400"
                />
              </p>
            )}
          </div>

          {/* Footer Columns */}
          {content.linkGroups?.map((column, columnIndex) => (
            <div key={columnIndex} className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-3">
                <InlineEditableField
                  value={column.title}
                  onChange={(newValue) =>
                    handleFieldUpdate(`column-${columnIndex}-title`, newValue)
                  }
                  isEditable={isSelected}
                  className="text-white"
                />
              </h3>
              <div className="flex flex-col space-y-2">
                {column.links?.map((link, linkIndex) => (
                  <Button
                    key={linkIndex}
                    variant="link"
                    className="text-gray-400 hover:text-white transition-colors justify-start p-0 h-auto"
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
                      isEditable={isSelected}
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
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <InlineEditableField
              value={content.copyright}
              onChange={(newValue) => handleFieldUpdate('copyright', newValue)}
              isEditable={isSelected}
              className="text-inherit"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default FooterSection;
