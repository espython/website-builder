'use client';

import { useState, useEffect, JSX } from 'react';
import {
  Section,
  TestimonialsContent,
  Testimonial,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash, Plus, GripVertical, Star, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';

// Import DnD kit
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface TestimonialsEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

// Sortable Testimonial Item Component
interface SortableTestimonialItemProps {
  testimonial: Testimonial;
  index: number;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) => void;
  renderRatingStars: (index: number, rating: number) => JSX.Element;
}

const SortableTestimonialItem = ({
  testimonial,
  index,
  onRemove,
  onChange,
  renderRatingStars,
}: SortableTestimonialItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: testimonial.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`mb-3 ${isDragging ? 'shadow-lg ring-2 ring-primary/20' : 'hover:shadow-md'} transition-shadow duration-200`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center cursor-grab p-1 rounded-md ${isDragging ? 'bg-gray-100' : 'hover:bg-gray-100'} transition-colors duration-200`}
            {...attributes}
            {...listeners}
          >
            <GripVertical
              size={18}
              className={`${isDragging ? 'text-primary' : 'text-gray-400'} transition-colors duration-200`}
            />
            <span className="ml-2 font-medium text-sm text-gray-700">
              Testimonial {index + 1}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
          >
            <Trash size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={`Avatar of ${testimonial.author}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/150?text=Avatar';
                  }}
                />
              ) : (
                <div className="text-center text-gray-400">
                  <User size={32} className="mx-auto mb-1" />
                  <span className="text-xs">No avatar</span>
                </div>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor={`avatar-${index}`} className="text-xs">
                Avatar URL
              </Label>
              <Input
                id={`avatar-${index}`}
                value={testimonial.avatar || ''}
                onChange={(e) => onChange(index, 'avatar', e.target.value)}
                className="mt-1"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div>{renderRatingStars(index, testimonial.rating)}</div>
            <div>
              <Label htmlFor={`content-${index}`}>Testimonial Text</Label>
              <Textarea
                id={`content-${index}`}
                value={testimonial.content}
                onChange={(e) => onChange(index, 'content', e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`author-${index}`}>Name</Label>
                <Input
                  id={`author-${index}`}
                  value={testimonial.author}
                  onChange={(e) => onChange(index, 'author', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`role-${index}`}>Role</Label>
                <Input
                  id={`role-${index}`}
                  value={testimonial.role || ''}
                  onChange={(e) => onChange(index, 'role', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                value={testimonial.company || ''}
                onChange={(e) => onChange(index, 'company', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsEditor = ({
  section,
  updateSection,
}: TestimonialsEditorProps) => {
  const { saveAndClose, isSaved } = useSectionEditor(section, updateSection);
  const [content, setContent] = useState<TestimonialsContent>(
    section.content as TestimonialsContent
  );

  // Configure sensors for drag and drop
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px movement required before drag starts
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150, // 150ms delay before drag starts
      tolerance: 5, // 5px movement allowed before cancelling
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // Handle drag end for testimonial reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = content.testimonials.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = content.testimonials.findIndex(
        (item) => item.id === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        moveTestimonial(oldIndex, newIndex);
      }
    }
  };

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={content.testimonials.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {content.testimonials.map((testimonial, index) => (
                    <SortableTestimonialItem
                      key={testimonial.id}
                      testimonial={testimonial}
                      index={index}
                      onRemove={removeTestimonial}
                      onChange={handleTestimonialChange}
                      renderRatingStars={renderRatingStars}
                    />
                  ))}
                </SortableContext>
              </DndContext>
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
