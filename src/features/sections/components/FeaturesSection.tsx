'use client';

import { FeaturesContent } from '@/features/sections/types/section';

interface FeaturesSectionProps {
  content: FeaturesContent;
  isSelected: boolean;
  onClick: () => void;
}

const FeaturesSection = ({
  content,
  isSelected,
  onClick,
}: FeaturesSectionProps) => {
  return (
    <section
      className={`py-16 px-8 bg-white cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          {content.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              {item.icon && (
                <div className="text-blue-500 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    {/* Placeholder for icon - in a real app, you might use a component library */}
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
