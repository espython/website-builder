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
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-12 px-8 bg-gray-800 text-white cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            {content.logo ? (
              <img src={content.logo} alt="Logo" className="h-8 mb-4" />
            ) : (
              <div className="text-xl font-bold mb-4">Logo</div>
            )}

            {content.description && (
              <p className="text-gray-300">{content.description}</p>
            )}
          </div>

          {/* Link Groups */}
          {content.linkGroups?.map((group) => (
            <div key={group.id}>
              <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.link}
                      className="text-gray-300 hover:text-white transition-colors"
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

        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            {content.copyright ||
              `© ${currentYear} Company Name. All rights reserved.`}
          </div>

          {/* Social Links */}
          {content.socialLinks && content.socialLinks.length > 0 && (
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
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
