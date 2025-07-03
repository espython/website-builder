'use client';

import { FooterContent } from '@/features/sections/types/section';

interface FooterSectionProps {
  content: FooterContent;
  isSelected: boolean;
  onClick: () => void;
}

const FooterSection = ({
  content,
  isSelected,
  onClick,
}: FooterSectionProps) => {
  return (
    <footer
      className={`bg-gray-900 text-white py-12 px-6 cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              {content.logo ? (
                <div className="flex items-center">
                  {content.logo.image && (
                    <img
                      src={content.logo.image}
                      alt="Logo"
                      className="h-8 mr-2"
                    />
                  )}
                  <span className="text-xl font-bold">{content.logo.text}</span>
                </div>
              ) : (
                <span className="text-xl font-bold">WebBuilder</span>
              )}
            </div>
            {content.description && (
              <p className="text-gray-400 mb-4">{content.description}</p>
            )}
          </div>

          {/* Link groups */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {content.linkGroups?.map((group) => (
              <div key={group.id || group.title} className="mb-4">
                <h3 className="font-medium text-white mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.link}
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="md:col-span-1">
            {content.socialLinks && content.socialLinks.length > 0 && (
              <div>
                <h3 className="font-medium text-white mb-4">Connect with us</h3>
                <div className="flex space-x-4">
                  {content.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.link}
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        {content.copyright && (
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            {content.copyright}
          </div>
        )}
      </div>
    </footer>
  );
};

export default FooterSection;
