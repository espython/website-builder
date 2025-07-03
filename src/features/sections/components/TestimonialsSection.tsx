'use client';

import { TestimonialsContent } from '@/features/sections/types/section';

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
          {content.subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center mb-4">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.author} avatar`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    {testimonial.author}
                  </h3>
                  {testimonial.role && (
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                {/* Star rating display */}
                {testimonial.rating && (
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        stroke="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 italic">{testimonial.content}</p>
              </div>
              {testimonial.company && (
                <div className="text-gray-500 text-sm">
                  {testimonial.company}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
