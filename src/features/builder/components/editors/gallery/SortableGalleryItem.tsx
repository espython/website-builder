'use client';

import { GalleryItem } from '@/features/sections/types/section';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Trash, GripVertical, Image as ImageIcon } from 'lucide-react';

export interface SortableGalleryItemProps {
  item: GalleryItem;
  index: number;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof GalleryItem, value: string) => void;
  isDragging?: boolean;
  isOver?: boolean;
}

export const SortableGalleryItem = ({
  item,
  index,
  onRemove,
  onChange,
  isDragging,
}: SortableGalleryItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    marginBottom: '0.75rem',
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`mb-3 ${isDragging ? 'shadow-lg ring-2 ring-primary/20' : 'hover:shadow-md'} transition-shadow duration-200`}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-3">
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
              Item {index + 1}
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

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.caption || `Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/400x400?text=Image+Error';
                  }}
                />
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon size={32} className="mx-auto mb-2" />
                  <span className="text-xs">No image</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="space-y-1">
              <Label htmlFor={`image-${index}`} className="text-xs">
                Image URL
              </Label>
              <Input
                id={`image-${index}`}
                type="text"
                value={item.image || ''}
                onChange={(e) => onChange(index, 'image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={`title-${index}`} className="text-xs">
                Link
              </Label>
              <Input
                id={`title-${index}`}
                type="text"
                value={item.link || ''}
                onChange={(e) => onChange(index, 'link', e.target.value)}
                placeholder="Image title"
                className="text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={`caption-${index}`} className="text-xs">
                Caption
              </Label>
              <Input
                id={`caption-${index}`}
                type="text"
                value={item.caption || ''}
                onChange={(e) => onChange(index, 'caption', e.target.value)}
                placeholder="Image caption"
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
