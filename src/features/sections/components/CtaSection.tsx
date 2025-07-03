'use client';

import { CTAContent } from '@/features/sections/types/section';

interface CtaSectionProps {
  content: CTAContent;
  isSelected: boolean;
  onClick: () => void;
}

const CtaSection = ({ content, isSelected, onClick }: CtaSectionProps) => {
  const bgStyle = content.backgroundImage
    ? { backgroundImage: `url(${content.backgroundImage})` }
    : {};

  return (
    <section
      className={`py-16 px-8 bg-blue-600 relative overflow-hidden cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
      style={bgStyle}
    >
      {/* Dark overlay for image backgrounds */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              content.backgroundImage ? 'text-white' : 'text-white'
            }`}
          >
            {content.title}
          </h2>
          {content.description && (
            <p
              className={`text-lg md:text-xl mb-8 ${
                content.backgroundImage ? 'text-gray-200' : 'text-blue-100'
              }`}
            >
              {content.description}
            </p>
          )}
          {content.buttonText && (
            <a
              href={content.buttonLink || '#'}
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3 rounded-md text-lg transition-colors shadow-md"
              onClick={(e) => e.preventDefault()} // Prevent navigation in builder mode
            >
              {content.buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
