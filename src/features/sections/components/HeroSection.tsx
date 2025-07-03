'use client';

import { HeroContent } from '@/features/sections/types/section';

interface HeroSectionProps {
  content: HeroContent;
  isSelected: boolean;
  onClick: () => void;
}

const HeroSection = ({ content, isSelected, onClick }: HeroSectionProps) => {
  const bgStyle = content.backgroundImage
    ? { backgroundImage: `url(${content.backgroundImage})` }
    : {};

  return (
    <div
      className={`relative min-h-[80vh] flex items-center cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
      style={bgStyle}
    >
      {/* Dark overlay for image backgrounds */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-3xl">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              content.backgroundImage ? 'text-white' : 'text-gray-900'
            }`}
          >
            {content.title}
          </h1>

          {content.subtitle && (
            <p
              className={`text-xl md:text-2xl mb-8 ${
                content.backgroundImage ? 'text-gray-200' : 'text-gray-600'
              }`}
            >
              {content.subtitle}
            </p>
          )}

          {content.buttonText && (
            <a
              href={content.buttonLink || '#'}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md text-lg transition-colors"
              onClick={(e) => e.preventDefault()} // Prevent navigation in builder mode
            >
              {content.buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
