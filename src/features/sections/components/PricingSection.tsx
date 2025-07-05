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
      className={`w-full overflow-hidden bg-gray-50 cursor-pointer rounded-none ${
        isSelected ? ' outline-2 outline-blue-500' : ''
      } ${
        // Base padding responsive to all screen sizes, not just preview mode
        previewMode === 'mobile'
          ? 'py-6 px-3'
          : previewMode === 'tablet'
            ? 'py-8 px-4'
            : 'py-8 px-4 sm:py-10 sm:px-6 md:py-14 md:px-8 lg:py-16'
      }`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto ${
          previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4'
        }`}
      >
        <div
          className={`text-center max-w-3xl mx-auto ${
            previewMode === 'mobile'
              ? 'mb-5'
              : previewMode === 'tablet'
                ? 'mb-6'
                : 'mb-6 sm:mb-8 md:mb-10 lg:mb-12'
          }`}
        >
          <h2
            className={`font-bold tracking-tight ${
              previewMode === 'mobile'
                ? 'text-xl mb-2'
                : previewMode === 'tablet'
                  ? 'text-2xl mb-3'
                  : 'text-2xl mb-3 sm:text-3xl sm:mb-4 md:text-4xl'
            }`}
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
              className={`text-gray-600 max-w-2xl mx-auto ${
                previewMode === 'mobile'
                  ? 'text-sm'
                  : previewMode === 'tablet'
                    ? 'text-base'
                    : 'text-base sm:text-lg'
              }`}
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

        {/* Responsive grid with proper gap handling */}
        <div
          className={`grid gap-y-6 ${
            // Enhanced responsive grid layout
            previewMode === 'mobile'
              ? 'grid-cols-1 gap-x-4'
              : previewMode === 'tablet'
                ? 'grid-cols-2 gap-x-4 lg:grid-cols-3'
                : 'grid-cols-1 gap-x-4 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8'
          }`}
        >
          {content.plans.map((plan, planIndex) => (
            <div
              key={plan.id}
              className={`relative flex flex-col h-full transition ${
                plan.featured
                  ? 'transform scale-100 sm:scale-105 z-10 ring-2 ring-primary shadow-lg'
                  : ''
              } rounded-lg overflow-hidden bg-white`}
            >
              {plan.featured && (
                <div className="absolute top-0 inset-x-0 bg-primary text-white text-center text-xs font-medium py-1">
                  Most Popular
                </div>
              )}
              <div
                className={`flex flex-col h-full ${
                  plan.featured ? 'pt-8 px-4 sm:px-6' : 'pt-6 px-4 sm:px-6'
                } ${
                  previewMode === 'mobile'
                    ? 'pb-4'
                    : previewMode === 'tablet'
                      ? 'pb-5'
                      : 'pb-6'
                }`}
              >
                <div className="mb-4 text-center">
                  <h3
                    className={`font-semibold ${
                      previewMode === 'mobile'
                        ? 'text-base mb-0.5'
                        : previewMode === 'tablet'
                          ? 'text-lg mb-1'
                          : 'text-lg sm:text-xl mb-1'
                    }`}
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
                    className={`${
                      previewMode === 'mobile'
                        ? 'text-xl'
                        : previewMode === 'tablet'
                          ? 'text-2xl'
                          : 'text-2xl sm:text-3xl'
                    } font-bold`}
                  >
                    <InlineEditableField
                      value={plan.price}
                      onChange={(newValue) =>
                        handleFieldUpdate(`plan-${planIndex}-price`, newValue)
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block"
                    />
                    {plan.interval && (
                      <span
                        className={`text-gray-500 ${
                          previewMode === 'mobile'
                            ? 'text-sm'
                            : previewMode === 'tablet'
                              ? 'text-base'
                              : 'text-base sm:text-lg'
                        }`}
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
                </div>
                {plan.description && (
                  <p
                    className={`${
                      previewMode === 'mobile'
                        ? 'text-xs mb-3'
                        : previewMode === 'tablet'
                          ? 'text-sm mb-4'
                          : 'text-sm sm:text-base mb-4'
                    } text-center text-gray-600`}
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

                {/* Features list with improved spacing */}
                <ul
                  className={`flex-grow ${
                    previewMode === 'mobile'
                      ? 'mb-4 justify-center items-center space-y-1.5'
                      : previewMode === 'tablet'
                        ? 'mb-5 justify-center space-y-2'
                        : 'mb-5 justify-center space-y-2 sm:space-y-3'
                  }`}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center  gap-2">
                      <CheckCircle
                        className={`${
                          previewMode === 'mobile'
                            ? 'h-3.5 w-3.5'
                            : previewMode === 'tablet'
                              ? 'h-4 w-4'
                              : 'h-4 w-4 sm:h-5 sm:w-5'
                        } text-green-500 flex-shrink-0 mt-0.5`}
                      />
                      <span
                        className={`${
                          previewMode === 'mobile'
                            ? 'text-xs'
                            : previewMode === 'tablet'
                              ? 'text-sm'
                              : 'text-sm sm:text-base'
                        } text-gray-600`}
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

                {/* Call to action button with improved responsiveness */}
                <a
                  href={plan.buttonLink || '#'}
                  className={`block w-full text-center ${
                    previewMode === 'mobile'
                      ? 'py-1.5 px-3 text-xs'
                      : previewMode === 'tablet'
                        ? 'py-2 px-3 text-sm'
                        : 'py-2.5 px-4 text-sm sm:py-3 sm:text-base'
                  } rounded transition-colors ${
                    plan.featured
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
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
