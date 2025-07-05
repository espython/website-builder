'use client';

import { PricingContent } from '@/features/sections/types/section';
import { CheckCircle } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { InlineEditableField } from './common/InlineEditableField';
import { useUpdateSection } from '../hooks/sections-hook';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface PricingSectionProps {
  content: PricingContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const PricingSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
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
      className={`${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-8 px-4' : 'py-8 sm:py-10 md:py-16 px-4 sm:px-6 md:px-8'} bg-gray-50 cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4'}`}
      >
        <div
          className={`text-center ${previewMode === 'mobile' ? 'mb-5' : previewMode === 'tablet' ? 'mb-6' : 'mb-8 sm:mb-10 md:mb-12'}`}
        >
          <h2
            className={`${previewMode === 'mobile' ? 'text-xl' : previewMode === 'tablet' ? 'text-2xl' : 'text-2xl sm:text-2xl md:text-3xl'} font-bold ${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
          >
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p
              className={`${previewMode === 'mobile' ? 'text-sm' : previewMode === 'tablet' ? 'text-base' : 'text-base sm:text-lg'} text-gray-600 max-w-2xl mx-auto`}
            >
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected && previewMode === 'desktop'}
                className="inline-block"
              />
            </p>
          )}
        </div>

        <div
          className={`grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-4' : previewMode === 'tablet' ? 'grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'}`}
        >
          {content.plans.map((plan, planIndex) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 ${plan.featured ? 'border-2 border-blue-500 relative' : ''}`}
            >
              {plan.featured && (
                <div
                  className={`bg-blue-500 text-white ${previewMode === 'mobile' ? 'py-0.5 px-2 text-xs' : previewMode === 'tablet' ? 'py-1 px-3 text-xs' : 'py-1 px-3 sm:px-4 text-xs sm:text-sm'} absolute top-0 right-0 rounded-bl-lg font-medium`}
                >
                  Popular
                </div>
              )}
              <div
                className={`${previewMode === 'mobile' ? 'p-3' : previewMode === 'tablet' ? 'p-4' : 'p-4 sm:p-5 md:p-6'}`}
              >
                <h3
                  className={`${previewMode === 'mobile' ? 'text-base' : previewMode === 'tablet' ? 'text-lg' : 'text-lg sm:text-xl'} font-bold ${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
                >
                  <InlineEditableField
                    value={plan.name}
                    onChange={(newValue) =>
                      handleFieldUpdate(`plan-${planIndex}-name`, newValue)
                    }
                    isEditable={isSelected && previewMode === 'desktop'}
                    className="inline-block"
                  />
                </h3>
                <div
                  className={`${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
                >
                  <span
                    className={`${previewMode === 'mobile' ? 'text-2xl' : previewMode === 'tablet' ? 'text-3xl' : 'text-3xl sm:text-4xl'} font-bold`}
                  >
                    $
                    <InlineEditableField
                      value={plan.price}
                      onChange={(newValue) =>
                        handleFieldUpdate(`plan-${planIndex}-price`, newValue)
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block"
                    />
                  </span>
                  {plan.interval && (
                    <span
                      className={`text-gray-500 ${previewMode === 'mobile' ? 'text-sm' : previewMode === 'tablet' ? 'text-base' : 'text-base sm:text-lg'}`}
                    >
                      /
                      <InlineEditableField
                        value={plan.interval}
                        onChange={(newValue) =>
                          handleFieldUpdate(
                            `plan-${planIndex}-interval`,
                            newValue
                          )
                        }
                        isEditable={isSelected && previewMode === 'desktop'}
                        className="inline-block"
                      />
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p
                    className={`${previewMode === 'mobile' ? 'text-xs mb-3' : previewMode === 'tablet' ? 'text-sm mb-4' : 'text-sm sm:text-base mb-4 sm:mb-6'} text-gray-600`}
                  >
                    <InlineEditableField
                      value={plan.description}
                      onChange={(newValue) =>
                        handleFieldUpdate(
                          `plan-${planIndex}-description`,
                          newValue
                        )
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block"
                    />
                  </p>
                )}
                <ul
                  className={`${previewMode === 'mobile' ? 'mb-4 space-y-1.5' : previewMode === 'tablet' ? 'mb-5 space-y-2' : 'mb-6 sm:mb-8 space-y-2 sm:space-y-3'}`}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle
                        className={`${previewMode === 'mobile' ? 'h-3.5 w-3.5' : previewMode === 'tablet' ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5'} text-green-500 flex-shrink-0 mt-0.5`}
                      />
                      <span
                        className={`${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'} text-gray-600`}
                      >
                        <InlineEditableField
                          value={feature}
                          onChange={(newValue) =>
                            handleFieldUpdate(
                              `plan-${planIndex}-feature-${featureIndex}`,
                              newValue
                            )
                          }
                          isEditable={isSelected && previewMode === 'desktop'}
                          className="inline-block"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.buttonLink || '#'}
                  className={`block w-full text-center ${previewMode === 'mobile' ? 'py-1.5 px-3 text-xs' : previewMode === 'tablet' ? 'py-2 px-3 text-sm' : 'py-2 px-4 text-sm sm:text-base'} rounded transition-colors ${plan.featured ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
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
                    isEditable={isSelected && previewMode === 'desktop'}
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
