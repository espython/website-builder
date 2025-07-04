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

interface TestimonialsSectionProps {
  content: TestimonialsContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const TestimonialsSection = ({
  content,
  isSelected,
  onClick,
  id,
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
      className={`py-12 px-6 bg-white cursor-pointer ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials?.map((testimonial, index) => (
            <Card
              key={testimonial.id || index}
              className="p-6 flex flex-col h-full hover:shadow-md transition-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {renderRating(testimonial.rating || 5)}
              </div>

              {/* Testimonial Content */}
              <div className="text-gray-700 mb-6 flex-grow">
                <InlineEditableField
                  value={testimonial.content}
                  onChange={(newValue) =>
                    handleFieldUpdate(`testimonial-${index}-content`, newValue)
                  }
                  isEditable={isSelected}
                  className="block italic"
                />
              </div>

              {/* Author Info */}
              <div className="flex items-center mt-4">
                {testimonial.avatar && (
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.author?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div className="font-medium">
                    <InlineEditableField
                      value={testimonial.author}
                      onChange={(newValue) =>
                        handleFieldUpdate(
                          `testimonial-${index}-author`,
                          newValue
                        )
                      }
                      isEditable={isSelected}
                      className="inline-block"
                    />
                  </div>
                  {(testimonial.role || testimonial.company) && (
                    <div className="text-sm text-gray-500">
                      <InlineEditableField
                        value={testimonial.role || ''}
                        onChange={(newValue) =>
                          handleFieldUpdate(
                            `testimonial-${index}-role`,
                            newValue
                          )
                        }
                        isEditable={isSelected}
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
                        isEditable={isSelected}
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
