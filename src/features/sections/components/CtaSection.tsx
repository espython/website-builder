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
    <div
      className={`py-16 px-8 bg-blue-50 bg-cover bg-center relative cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      style={bgStyle}
      onClick={onClick}
    >
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          className={`text-3xl font-bold mb-4 ${
            content.backgroundImage ? 'text-white' : 'text-gray-800'
          }`}
        >
          {content.title}
        </h2>

        {content.description && (
          <p
            className={`text-xl mb-8 ${
              content.backgroundImage ? 'text-gray-200' : 'text-gray-600'
            }`}
          >
            {content.description}
          </p>
        )}

        <a
          href={content.buttonLink || '#'}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md text-lg transition-colors"
          onClick={(e) => e.preventDefault()} // Prevent navigation in builder mode
        >
          {content.buttonText}
        </a>
      </div>
    </div>
  );
};

export default CtaSection;
