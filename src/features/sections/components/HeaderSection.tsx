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
import { PreviewMode } from '@/features/preview/store/uiStore';

interface HeaderSectionProps {
  content: HeaderContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const HeaderSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: HeaderSectionProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const updateSection = useUpdateSection();

  console.log(content);

  // Handler for updating different fields
  const handleFieldUpdate = (field: string, value: string) => {
    console.log('Updating header field:', field, value); // Debug log
    console.log('Field type:', typeof field); // Check type of field parameter

    // Create a proper deep copy of the content object
    const updatedContent = {
      ...content,
      menuItems: content.menuItems ? [...content.menuItems] : [],
    };

    if (field === 'logo') {
      updatedContent.logo = value;
    } else if (typeof field === 'string' && field.startsWith('menu-')) {
      // Handle menu items with menu- prefix
      const itemId = field;
      console.log('Split itemId:', itemId);

      const itemIndex = updatedContent.menuItems.findIndex(
        (item) => item.id === itemId
      );
      console.log('itemIndex for menu-prefix:', itemIndex);

      if (itemIndex !== -1) {
        updatedContent.menuItems = updatedContent.menuItems.map((item) =>
          item.id === itemId ? { ...item, label: value } : item
        );
      }
    } else {
      // Handle direct item.id passed as field
      console.log('Direct item.id passed:', field);
      console.log(
        'Available menuItems:',
        updatedContent.menuItems.map((item) => ({
          id: item.id,
          label: item.label,
        }))
      );

      // Convert field to string for safer comparison if it's not already
      const fieldStr = String(field);

      // Try to find the item both with direct comparison and string comparison
      const itemIndex = updatedContent.menuItems.findIndex(
        (item) => item.id === field || item.id === fieldStr
      );
      console.log('itemIndex for direct id:', itemIndex);

      if (itemIndex !== -1) {
        updatedContent.menuItems = updatedContent.menuItems.map((item) => {
          const matches = item.id === field || item.id === fieldStr;
          console.log(`Comparing ${item.id} with ${field}: ${matches}`);
          return matches ? { ...item, label: value } : item;
        });
      } else if (field === 'contactButtonText') {
        updatedContent.contactButtonText = value;
      }
    }

    console.log('Final updatedContent:', updatedContent);

    // For debugging - check what we're actually passing to the store
    console.log('Sending to store - id:', id);
    console.log('Sending to store - content:', updatedContent);

    // Make sure we're passing the content in the format expected by the store
    // The store expects to receive just the content portion, not the entire section
    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`${previewMode === 'mobile' ? 'py-2 px-3' : previewMode === 'tablet' ? 'py-3 px-4' : 'py-4 px-6'} bg-white border-b border-gray-200 sticky top-0 z-50 cursor-pointer rounded-none shadow-sm ${isSelected ? 'outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4 lg:px-6'}`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            {/* We'll keep using Avatar for the logo instead of text editing */}
            <Avatar
              className={`${previewMode === 'mobile' ? 'w-8 h-8' : previewMode === 'tablet' ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'} rounded-lg`}
            >
              <AvatarImage src={content?.logo || undefined} />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          </div>

          {/* Desktop menu */}
          <div
            className={`${previewMode === 'mobile' ? 'hidden' : 'hidden md:flex'} items-center space-x-2 sm:space-x-3 lg:space-x-6`}
          >
            {content.menuItems?.map((item) => (
              <InlineEditableField
                key={item.id}
                value={item.label}
                onChange={(newValue) => handleFieldUpdate(item.id, newValue)}
                isEditable={isSelected && previewMode === 'desktop'}
                className={`${previewMode === 'tablet' ? 'text-xs' : 'text-sm lg:text-base'} text-gray-600 hover:text-blue-600 transition-colors`}
              />
            ))}

            {/* Contact Button */}
            {content.showContactButton !== false &&
              content.contactButtonText && (
                <Button
                  variant="default"
                  className={`${previewMode === 'tablet' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-2'} bg-blue-600 hover:bg-blue-700 ${isSelected ? 'hover:bg-blue-800' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <InlineEditableField
                    value={content.contactButtonText}
                    onChange={(newValue) =>
                      handleFieldUpdate('contactButtonText', newValue)
                    }
                    isEditable={isSelected && previewMode === 'desktop'}
                    className="text-white"
                    buttonClassName="bg-white"
                  />
                </Button>
              )}
          </div>

          {/* Mobile menu button */}
          <div
            className={`${previewMode === 'mobile' || previewMode === 'tablet' ? 'block' : 'md:hidden'}`}
          >
            <Button
              variant="ghost"
              size={previewMode === 'mobile' ? 'sm' : 'icon'}
              className="text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              {mobileMenuOpen ? (
                <X size={previewMode === 'mobile' ? 20 : 24} />
              ) : (
                <Menu size={previewMode === 'mobile' ? 20 : 24} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className={`mt-4 py-4 border-t border-gray-200 ${previewMode === 'mobile' || previewMode === 'tablet' ? 'block' : 'md:hidden'}`}
          >
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
