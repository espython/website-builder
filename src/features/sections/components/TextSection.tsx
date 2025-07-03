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
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
        <div
          className="prose lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </section>
  );
};

export default TextSection;
