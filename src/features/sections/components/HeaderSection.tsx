'use client';

import { HeaderContent } from '@/features/sections/types/section';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface HeaderSectionProps {
  content: HeaderContent;
  isSelected: boolean;
  onClick: () => void;
}

const HeaderSection = ({
  content,
  isSelected,
  onClick,
}: HeaderSectionProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`py-4 px-6 bg-white border-b border-gray-200 sticky top-0 z-50 cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <Avatar className="rounded-lg ">
              <AvatarImage
                src={content?.logo || undefined}
                className="max-w-16 max-h-16"
              />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {content.menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Button (Desktop) */}
          {content.showContactButton !== false && content.contactButtonText && (
            <div className="hidden md:block">
              <a
                href={content.contactButtonLink || '#'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {content.contactButtonText}
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-4 py-4 border-t border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-3">
              {content.menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="block text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Button (Mobile) */}
            {content.showContactButton !== false &&
              content.contactButtonText && (
                <div className="mt-6">
                  <a
                    href={content.contactButtonLink || '#'}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    {content.contactButtonText}
                  </a>
                </div>
              )}
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;
