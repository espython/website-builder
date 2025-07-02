'use client';

import { HeaderContent } from '@/features/sections/types/section';
import { Menu } from 'lucide-react';
import { useState } from 'react';

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
      className={`py-4 px-8 bg-white shadow-sm sticky top-0 z-50 cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {content.logo ? (
              <img src={content.logo} alt="Logo" className="h-8" />
            ) : (
              <div className="text-xl font-bold">Logo</div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {content.menuItems?.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="text-gray-600 hover:text-gray-900"
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}

            {content.showContactButton && (
              <a
                href={content.contactButtonLink || '#'}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {content.contactButtonText || 'Contact Us'}
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <Menu />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            {content.menuItems?.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}

            {content.showContactButton && (
              <a
                href={content.contactButtonLink || '#'}
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full text-center mt-4"
                onClick={(e) => e.preventDefault()}
              >
                {content.contactButtonText || 'Contact Us'}
              </a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;
