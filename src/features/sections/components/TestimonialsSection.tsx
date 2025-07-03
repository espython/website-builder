'use client';

import { TestimonialsContent } from '@/features/sections/types/section';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  content: TestimonialsContent;
  isSelected: boolean;
  onClick: () => void;
}

const TestimonialsSection = ({
  content,
  isSelected,
  onClick,
}: TestimonialsSectionProps) => {
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
          {content.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="flex mb-4">
                {renderRating(testimonial.rating)}
              </div>
              <blockquote className="text-gray-700 mb-4">
                {testimonial.content}
              </blockquote>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  {(testimonial.role || testimonial.company) && (
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                      {testimonial.role && testimonial.company ? ', ' : ''}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
