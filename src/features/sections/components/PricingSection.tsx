'use client';

import { PricingContent } from '@/features/sections/types/section';
import { CheckCircle } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { useUpdateSection } from '../hooks/sections-hook';

interface PricingSectionProps {
  content: PricingContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const PricingSection = ({
  content,
  isSelected,
  onClick,
  id,
}: PricingSectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field.startsWith('plan-')) {
      // Handle plan updates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, planIndex, subfield] = field.split('-');
      const index = parseInt(planIndex, 10);

      if (updatedContent.plans[index]) {
        if (subfield === 'name') {
          updatedContent.plans[index].name = value;
        } else if (subfield === 'price') {
          updatedContent.plans[index].price = value;
        } else if (subfield === 'interval') {
          updatedContent.plans[index].interval = value;
        } else if (subfield === 'description') {
          updatedContent.plans[index].description = value;
        } else if (subfield === 'buttonText') {
          updatedContent.plans[index].buttonText = value;
        } else if (subfield.startsWith('feature-')) {
          const featureIndex = parseInt(subfield.split('-')[1], 10);
          updatedContent.plans[index].features[featureIndex] = value;
        }
      }
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`py-8 sm:py-10 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-50 cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected}
                className="inline-block"
              />
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {content.plans.map((plan, planIndex) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 ${plan.featured ? 'border-2 border-blue-500 relative' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {plan.featured && (
                <div className="bg-blue-500 text-white py-1 px-3 sm:px-4 absolute top-0 right-0 rounded-bl-lg text-xs sm:text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  <InlineEditableField
                    value={plan.name}
                    onChange={(newValue) =>
                      handleFieldUpdate(`plan-${planIndex}-name`, newValue)
                    }
                    isEditable={isSelected}
                    className="inline-block"
                  />
                </h3>
                <div className="mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl font-bold">
                    $
                    <InlineEditableField
                      value={plan.price}
                      onChange={(newValue) =>
                        handleFieldUpdate(`plan-${planIndex}-price`, newValue)
                      }
                      isEditable={isSelected}
                      className="inline-block"
                    />
                  </span>
                  {plan.interval && (
                    <span className="text-gray-500 text-base sm:text-lg">
                      /
                      <InlineEditableField
                        value={plan.interval}
                        onChange={(newValue) =>
                          handleFieldUpdate(
                            `plan-${planIndex}-interval`,
                            newValue
                          )
                        }
                        isEditable={isSelected}
                        className="inline-block"
                      />
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    <InlineEditableField
                      value={plan.description}
                      onChange={(newValue) =>
                        handleFieldUpdate(
                          `plan-${planIndex}-description`,
                          newValue
                        )
                      }
                      isEditable={isSelected}
                      className="inline-block"
                    />
                  </p>
                )}
                <ul className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-600">
                        <InlineEditableField
                          value={feature}
                          onChange={(newValue) =>
                            handleFieldUpdate(
                              `plan-${planIndex}-feature-${featureIndex}`,
                              newValue
                            )
                          }
                          isEditable={isSelected}
                          className="inline-block"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.buttonLink || '#'}
                  className={`block w-full text-center py-2 px-4 rounded text-sm sm:text-base transition-colors ${plan.featured ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                  onClick={(e) => e.preventDefault()}
                >
                  <InlineEditableField
                    value={plan.buttonText || 'Get Started'}
                    onChange={(newValue) =>
                      handleFieldUpdate(
                        `plan-${planIndex}-buttonText`,
                        newValue
                      )
                    }
                    isEditable={isSelected}
                    className={plan.featured ? 'text-white' : ''}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PricingSection;
