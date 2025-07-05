'use client';

import { Testimonial } from '@/features/sections/types/section';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash, User } from 'lucide-react';
import { JSX, memo } from 'react';

export interface SortableTestimonialItemProps {
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

export const SortableTestimonialItem = memo(function SortableTestimonialItem({
  testimonial,
  index,
  onRemove,
  onChange,
  renderRatingStars,
}: SortableTestimonialItemProps) {
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
                type="text"
                value={testimonial.avatar || ''}
                onChange={(e) => onChange(index, 'avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="mt-1"
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div>
              <Label htmlFor={`author-${index}`}>Author Name</Label>
              <Input
                id={`author-${index}`}
                type="text"
                value={testimonial.author || ''}
                onChange={(e) => onChange(index, 'author', e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`role-${index}`}>Role / Company</Label>
              <Input
                id={`role-${index}`}
                type="text"
                value={testimonial.role || ''}
                onChange={(e) => onChange(index, 'role', e.target.value)}
                placeholder="CEO at Company"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`content-${index}`}>Testimonial Content</Label>
              <Textarea
                id={`content-${index}`}
                value={testimonial.content || ''}
                onChange={(e) => onChange(index, 'content', e.target.value)}
                placeholder="What the customer said about your product/service..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label className="block mb-2">Rating</Label>
              {renderRatingStars(index, testimonial.rating || 5)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
