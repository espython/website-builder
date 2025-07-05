'use client';

import { Testimonial } from '@/features/sections/types/section';
import { SortableTestimonialItem } from './SortableTestimonialItem';
import { useTestimonialsDragAndDrop } from '@/features/builder/hooks/useTestimonialsDragAndDrop';
import { memo } from 'react';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { User, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { JSX } from 'react';

export interface TestimonialsListProps {
  testimonials: Testimonial[];
  onTestimonialsChange: (testimonials: Testimonial[]) => void;
  onRemoveTestimonial: (index: number) => void;
  onChangeTestimonial: (
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) => void;
  onAddTestimonial: () => void;
  renderRatingStars: (index: number, rating: number) => JSX.Element;
}

export const TestimonialsList = memo(function TestimonialsList({
  testimonials,
  onTestimonialsChange,
  onRemoveTestimonial,
  onChangeTestimonial,
  onAddTestimonial,
  renderRatingStars,
}: TestimonialsListProps) {
  const {
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useTestimonialsDragAndDrop(testimonials, onTestimonialsChange);

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 rounded-full p-3 mb-2">
            <User size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No testimonials added yet</p>
          <Button onClick={onAddTestimonial} className="px-3 py-1 text-sm">
            <Plus size={16} className="mr-2" />
            Add First Testimonial
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={testimonials.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {testimonials.map((testimonial, index) => (
            <SortableTestimonialItem
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              onRemove={onRemoveTestimonial}
              onChange={onChangeTestimonial}
              renderRatingStars={renderRatingStars}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
});
