'use client';

import { PricingContent } from '@/features/sections/types/section';
import { CheckCircle } from 'lucide-react';

interface PricingSectionProps {
  content: PricingContent;
  isSelected: boolean;
  onClick: () => void;
}

const PricingSection = ({
  content,
  isSelected,
  onClick,
}: PricingSectionProps) => {
  return (
    <section
      className={`py-16 px-8 bg-gray-50 cursor-pointer ${
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
          {content.plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 ${
                plan.featured ? 'border-2 border-blue-500 relative' : ''
              }`}
            >
              {plan.featured && (
                <div className="bg-blue-500 text-white py-1 px-4 absolute top-0 right-0 rounded-bl-lg text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.interval && (
                    <span className="text-gray-500 text-lg">
                      /{plan.interval}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                )}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.buttonLink || '#'}
                  className={`block w-full text-center py-2 px-4 rounded transition-colors ${
                    plan.featured
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  {plan.buttonText || 'Get Started'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
