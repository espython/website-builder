'use client';

import { TestimonialsContent } from '@/features/sections/types/section';
import { Star } from 'lucide-react';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/components/ui/avatar';
import { InlineEditableField } from './common/InlineEditableField';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface TestimonialsSectionProps {
  content: TestimonialsContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const TestimonialsSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: TestimonialsSectionProps) => {
  const updateSection = useUpdateSection();

  // Helper function to render stars based on rating
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field.startsWith('testimonial-')) {
      // Handle testimonial item updates
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, itemIndex, subfield] = field.split('-');
      const index = parseInt(itemIndex, 10);

      if (updatedContent.testimonials?.[index]) {
        if (subfield === 'content') {
          updatedContent.testimonials[index].content = value;
        } else if (subfield === 'author') {
          updatedContent.testimonials[index].author = value;
        } else if (subfield === 'role') {
          updatedContent.testimonials[index].role = value;
        } else if (subfield === 'company') {
          updatedContent.testimonials[index].company = value;
        }
      }
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-8 px-4' : 'py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6'} bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
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
          className={`grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-3' : previewMode === 'tablet' ? 'grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'}`}
        >
          {content.testimonials?.map((testimonial, index) => (
            <Card
              key={testimonial.id || index}
              className={`${previewMode === 'mobile' ? 'p-3' : previewMode === 'tablet' ? 'p-4' : 'p-4 sm:p-5 md:p-6'} flex flex-col h-full hover:shadow-md transition-shadow`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Rating Stars */}
              <div
                className={`flex ${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
              >
                {renderRating(testimonial.rating || 5)}
              </div>

              {/* Testimonial Content */}
              <div
                className={`text-gray-700 ${previewMode === 'mobile' ? 'mb-3 text-xs' : previewMode === 'tablet' ? 'mb-4 text-sm' : 'mb-4 sm:mb-6 text-sm sm:text-base'} flex-grow`}
              >
                <InlineEditableField
                  value={testimonial.content}
                  onChange={(newValue) =>
                    handleFieldUpdate(`testimonial-${index}-content`, newValue)
                  }
                  isEditable={isSelected && previewMode === 'desktop'}
                  className="block italic"
                />
              </div>

              {/* Author Info */}
              <div
                className={`flex items-center ${previewMode === 'mobile' ? 'mt-2' : previewMode === 'tablet' ? 'mt-3' : 'mt-3 sm:mt-4'}`}
              >
                {testimonial.avatar && (
                  <Avatar
                    className={`${previewMode === 'mobile' ? 'h-6 w-6 mr-1' : previewMode === 'tablet' ? 'h-8 w-8 mr-2' : 'h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3'}`}
                  >
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.author?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div
                    className={`font-medium ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    <InlineEditableField
                      value={testimonial.author}
                      onChange={(newValue) =>
                        handleFieldUpdate(
                          `testimonial-${index}-author`,
                          newValue
                        )
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block"
                    />
                  </div>
                  {(testimonial.role || testimonial.company) && (
                    <div
                      className={`${previewMode === 'mobile' ? 'text-xxs' : previewMode === 'tablet' ? 'text-xs' : 'text-xs sm:text-sm'} text-gray-500`}
                    >
                      <InlineEditableField
                        value={testimonial.role || ''}
                        onChange={(newValue) =>
                          handleFieldUpdate(
                            `testimonial-${index}-role`,
                            newValue
                          )
                        }
                        isEditable={isSelected && previewMode === 'desktop'}
                        className="inline-block"
                      />
                      {testimonial.role && testimonial.company ? ', ' : ''}
                      <InlineEditableField
                        value={testimonial.company || ''}
                        onChange={(newValue) =>
                          handleFieldUpdate(
                            `testimonial-${index}-company`,
                            newValue
                          )
                        }
                        isEditable={isSelected && previewMode === 'desktop'}
                        className="inline-block"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TestimonialsSection;
