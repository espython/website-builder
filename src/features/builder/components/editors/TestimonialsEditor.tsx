'use client';

import { useCallback } from 'react';
import {
  Section,
  TestimonialsContent,
  Testimonial,
} from '@/features/sections/types/section';
import { Plus, Star } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { TestimonialsList } from './testimonials/TestimonialsList';
import { BaseEditorProps } from './types';

interface TestimonialsEditorProps extends BaseEditorProps {
  section: Section;
}

const TestimonialsEditor = ({
  section,
  updateSection,
}: TestimonialsEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<TestimonialsContent>(
    section,
    updateSection
  );

  // Handle testimonials change
  const handleTestimonialsChange = useCallback(
    (testimonials: Testimonial[]) => {
      handleChange('testimonials', testimonials);
    },
    [handleChange]
  );

  // Handle input changes
  const handleTestimonialChange = useCallback(
    (index: number, field: keyof Testimonial, value: number | string) => {
      const updatedTestimonials = [...content.testimonials];
      updatedTestimonials[index] = {
        ...updatedTestimonials[index],
        [field]: value,
      };
      handleChange('testimonials', updatedTestimonials);
    },
    [content.testimonials, handleChange]
  );

  // Add new testimonial
  const addTestimonial = useCallback(() => {
    const newTestimonial: Testimonial = {
      id: uuidv4(),
      author: '',
      role: '',
      content: '',
      avatar: '',
      rating: 5,
    };

    const updatedTestimonials = [
      ...(content.testimonials || []),
      newTestimonial,
    ];
    handleChange('testimonials', updatedTestimonials);
  }, [content.testimonials, handleChange]);

  // Remove testimonial
  const removeTestimonial = useCallback(
    (index: number) => {
      const updatedTestimonials = [...content.testimonials];
      updatedTestimonials.splice(index, 1);
      handleChange('testimonials', updatedTestimonials);
    },
    [content.testimonials, handleChange]
  );

  // Helper function to render star rating input
  const renderRatingStars = useCallback(
    (index: number, rating: number) => {
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
    },
    [handleTestimonialChange]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Section title"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Section description"
            rows={2}
          />
        </div>
      </div>

      <div className="space-y-4 border border-gray-200 rounded-md p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Customer Testimonials
          </h3>
          <Button onClick={addTestimonial} size="sm" className="h-8">
            <Plus size={14} className="mr-1" />
            Add Testimonial
          </Button>
        </div>

        <TestimonialsList
          testimonials={content.testimonials || []}
          onTestimonialsChange={handleTestimonialsChange}
          onRemoveTestimonial={removeTestimonial}
          onChangeTestimonial={handleTestimonialChange}
          onAddTestimonial={addTestimonial}
          renderRatingStars={renderRatingStars}
        />
      </div>
    </div>
  );
};

export default TestimonialsEditor;
