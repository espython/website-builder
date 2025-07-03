'use client';

import { TextContent } from '@/features/sections/types/section';

interface TextSectionProps {
  content: TextContent;
  isSelected: boolean;
  onClick: () => void;
}

const TextSection = ({ content, isSelected, onClick }: TextSectionProps) => {
  return (
    <section
      className={`py-16 px-8 bg-white cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {content.title && (
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {content.title}
            </h2>
          )}

          <div className="prose prose-lg max-w-none">
            {/* 
              For a real implementation, you would use a markdown or rich text renderer here
              For this simplified version, we're just using the raw text with basic formatting
            */}
            {content.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextSection;
