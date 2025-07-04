'use client';

import { HeaderContent } from '@/features/sections/types/section';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { useUpdateSection } from '../hooks/sections-hook';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';

interface HeaderSectionProps {
  content: HeaderContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const HeaderSection = ({
  content,
  isSelected,
  onClick,
  id,
}: HeaderSectionProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const updateSection = useUpdateSection();

  // Handler for updating different fields
  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'logo') {
      updatedContent.logo = value;
    } else if (field.startsWith('menuItem-')) {
      const itemId = field.split('-')[1];
      const itemIndex = updatedContent.menuItems.findIndex(
        (item) => item.id === itemId
      );

      if (itemIndex !== -1) {
        updatedContent.menuItems[itemIndex] = {
          ...updatedContent.menuItems[itemIndex],
          label: value,
        };
      }
    } else if (field === 'contactButtonText') {
      updatedContent.contactButtonText = value;
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`py-4 px-6 bg-white border-b border-gray-200 sticky top-0 z-50 cursor-pointer rounded-none shadow-sm ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            {/* We'll keep using Avatar for the logo instead of text editing */}
            <Avatar>
              <AvatarImage src={content?.logo || undefined} />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {content.menuItems?.map((item) => (
              <InlineEditableField
                key={item.id}
                value={item.label}
                onChange={(newValue) =>
                  handleFieldUpdate(`menuItem-${item.id}`, newValue)
                }
                isEditable={isSelected}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              />
            ))}

            {/* Contact Button */}
            {content.showContactButton !== false &&
              content.contactButtonText && (
                <Button
                  variant="default"
                  className={`bg-blue-600 hover:bg-blue-700 ${isSelected ? 'hover:bg-blue-800' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <InlineEditableField
                    value={content.contactButtonText}
                    onChange={(newValue) =>
                      handleFieldUpdate('contactButtonText', newValue)
                    }
                    isEditable={isSelected}
                    className="text-white"
                    buttonClassName="bg-white"
                  />
                </Button>
              )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {content.menuItems?.map((item) => (
                <InlineEditableField
                  key={item.id}
                  value={item.label}
                  onChange={(newValue) =>
                    handleFieldUpdate(`menuItem-${item.id}`, newValue)
                  }
                  isEditable={isSelected}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                />
              ))}

              {content.showContactButton !== false &&
                content.contactButtonText && (
                  <div className="mt-6">
                    <Button
                      variant="default"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <InlineEditableField
                        value={content.contactButtonText}
                        onChange={(newValue) =>
                          handleFieldUpdate('contactButtonText', newValue)
                        }
                        isEditable={isSelected}
                        className="text-white"
                        buttonClassName="bg-white"
                      />
                    </Button>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default HeaderSection;
