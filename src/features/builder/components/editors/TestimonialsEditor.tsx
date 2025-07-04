'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  TestimonialsContent,
  Testimonial,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash, Plus, GripVertical, Star, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';

interface TestimonialsEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const TestimonialsEditor = ({
  section,
  updateSection,
}: TestimonialsEditorProps) => {
  const { saveAndClose, isSaved } = useSectionEditor(section, updateSection);
  const [content, setContent] = useState<TestimonialsContent>(
    section.content as TestimonialsContent
  );

  // Update local state when section changes
  useEffect(() => {
    setContent(section.content as TestimonialsContent);
  }, [section.id, section.content]);

  // Handle input changes
  const handleChange = (
    field: keyof TestimonialsContent,
    value: string | boolean | Testimonial[]
  ) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
  };

  // Handle testimonial changes
  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: number | string
  ) => {
    const updatedTestimonials = [...content.testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value,
    };
    handleChange('testimonials', updatedTestimonials);
  };

  // Add new testimonial
  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: uuidv4(),
      content: 'This product/service exceeded my expectations!',
      author: 'Jane Doe',
      role: 'CEO',
      company: 'Example Inc.',
      avatar: 'https://via.placeholder.com/150',
      rating: 5,
    };
    const updatedTestimonials = [...content.testimonials, newTestimonial];
    handleChange('testimonials', updatedTestimonials);
  };

  // Remove testimonial
  const removeTestimonial = (index: number) => {
    const updatedTestimonials = [...content.testimonials];
    updatedTestimonials.splice(index, 1);
    handleChange('testimonials', updatedTestimonials);
  };

  // Move testimonial up/down
  const moveTestimonial = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      fromIndex >= content.testimonials.length ||
      toIndex < 0 ||
      toIndex >= content.testimonials.length
    ) {
      return;
    }

    const updatedTestimonials = [...content.testimonials];
    const [movedTestimonial] = updatedTestimonials.splice(fromIndex, 1);
    updatedTestimonials.splice(toIndex, 0, movedTestimonial);
    handleChange('testimonials', updatedTestimonials);
  };

  // Move testimonial up
  const moveTestimonialUp = (index: number) => {
    moveTestimonial(index, index - 1);
  };

  // Move testimonial down
  const moveTestimonialDown = (index: number) => {
    moveTestimonial(index, index + 1);
  };

  // Helper function to render star rating input
  const renderRatingStars = (index: number, rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleTestimonialChange(index, 'rating', star)}
            className={`p-1 ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            } hover:text-yellow-400`}
            title={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star size={16} />
          </button>
        ))}
        <span className="ml-2 text-xs text-gray-500">{rating} of 5</span>
      </div>
    );
  };

  // Debounced auto-save when changes are made
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSection(section.id, content);
    }, 500);

    return () => clearTimeout(timer);
  }, [content, section.id, updateSection]);

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Testimonials Content
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Testimonials */}
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Customer Testimonials</h4>
            <button
              type="button"
              onClick={addTestimonial}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={14} className="inline mr-1" />
              Add Testimonial
            </button>
          </div>

          {content.testimonials.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <User size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No testimonials added yet</p>
                <button
                  type="button"
                  onClick={addTestimonial}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add First Testimonial
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {content.testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="p-4 border border-gray-200 rounded-md bg-white"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <GripVertical size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium">
                        Testimonial {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => moveTestimonialUp(index)}
                        disabled={index === 0}
                        className={`p-1 ${
                          index === 0
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveTestimonialDown(index)}
                        disabled={index === content.testimonials.length - 1}
                        className={`p-1 ${
                          index === content.testimonials.length - 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Remove testimonial"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-1">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-2">
                          {testimonial.avatar ? (
                            <img
                              src={testimonial.avatar}
                              alt={`${testimonial.author} avatar`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://via.placeholder.com/150?text=Avatar';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <User size={40} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="w-full">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Avatar URL
                          </label>
                          <input
                            type="text"
                            value={testimonial.avatar || ''}
                            onChange={(e) =>
                              handleTestimonialChange(
                                index,
                                'avatar',
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mt-3 w-full">
                          {renderRatingStars(index, testimonial.rating)}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Testimonial Text
                        </label>
                        <textarea
                          value={testimonial.content}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              'content',
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={testimonial.author}
                            onChange={(e) =>
                              handleTestimonialChange(
                                index,
                                'author',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Role
                          </label>
                          <input
                            type="text"
                            value={testimonial.role || ''}
                            onChange={(e) =>
                              handleTestimonialChange(
                                index,
                                'role',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={testimonial.company || ''}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              'company',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-4">
        <button
          onClick={saveAndClose}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default TestimonialsEditor;
