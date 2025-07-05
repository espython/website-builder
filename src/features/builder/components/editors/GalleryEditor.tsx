'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  GalleryContent,
  GalleryItem,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash, Plus, GripVertical, Image as ImageIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

// Import DnD kit
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove } from '@dnd-kit/sortable';

interface GalleryEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

// Sortable Gallery Item Component
interface SortableGalleryItemProps {
  item: GalleryItem;
  index: number;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof GalleryItem, value: string) => void;
  isDragging?: boolean;
  isOver?: boolean;
}

const SortableGalleryItem = ({
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
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`link-${index}`} className="text-xs">
                Link URL (optional)
              </Label>
              <Input
                id={`link-${index}`}
                type="text"
                value={item.link || ''}
                onChange={(e) => onChange(index, 'link', e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const GalleryEditor = ({ section, updateSection }: GalleryEditorProps) => {
  const [content, setContent] = useState<GalleryContent>(
    section.content as GalleryContent
  );

  // Update local state when section changes
  useEffect(() => {
    setContent(section.content as GalleryContent);
  }, [section.id, section.content]);

  // Handle input changes
  const handleChange = (
    field: keyof GalleryContent,
    value: string | boolean | GalleryItem[]
  ) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
  };

  // Handle gallery item changes
  const handleItemChange = (
    index: number,
    field: keyof GalleryItem,
    value: string
  ) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('items', updatedItems);
  };

  // Add new gallery item
  const addItem = () => {
    const newItem: GalleryItem = {
      id: uuidv4(),
      image: 'https://via.placeholder.com/800x600',
      caption: 'New image caption',
      link: '',
    };
    const updatedItems = [...content.items, newItem];
    handleChange('items', updatedItems);
  };

  // Remove gallery item
  const removeItem = (index: number) => {
    const updatedItems = [...content.items];
    updatedItems.splice(index, 1);
    handleChange('items', updatedItems);
  };

  // Add state for tracking drag and drop operations
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const overItemId = event.over.id.toString();
      const overItemIndex = content.items.findIndex(
        (item) => item.id === overItemId
      );
      setOverIndex(overItemIndex);
    } else {
      setOverIndex(null);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset drag states
    setActiveId(null);
    setOverIndex(null);

    if (over && active.id !== over.id) {
      const oldIndex = content.items.findIndex((item) => item.id === active.id);
      const newIndex = content.items.findIndex((item) => item.id === over.id);

      // Create a new array with the item moved
      const newItems = arrayMove(content.items, oldIndex, newIndex);
      setContent({
        ...content,
        items: newItems,
      });
    }
  };

  // Render gallery items with drop indicators
  const renderGalleryItems = () => {
    return (
      <div className="space-y-1 relative">
        {/* First position drop indicator */}
        {activeId && (
          <div
            className={`h-1 bg-primary rounded-full my-1 transition-all duration-150 ${
              overIndex === 0
                ? 'opacity-100 scale-y-100'
                : 'opacity-0 scale-y-0'
            }`}
          />
        )}

        {content.items.map((item, index) => (
          <div key={item.id} className="relative">
            <SortableGalleryItem
              item={item}
              index={index}
              onRemove={removeItem}
              onChange={handleItemChange}
              isDragging={activeId === item.id}
              isOver={overIndex === index}
            />

            {/* Drop indicator after each item */}
            {activeId && (
              <div
                className={`h-1 bg-primary rounded-full my-1 transition-all duration-150 ${
                  overIndex === index + 1
                    ? 'opacity-100 scale-y-100'
                    : 'opacity-0 scale-y-0'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

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
          Gallery Content
        </h3>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
          />
        </div>

        {/* Gallery Items */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Gallery Items</h4>
              <Button size="sm" onClick={addItem}>
                <Plus size={16} className="mr-1" />
                Add Image
              </Button>
            </div>

            {content.items && content.items.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={content.items.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {renderGalleryItems()}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="text-center p-6 border border-dashed rounded-md border-gray-300">
                <div className="text-gray-400 mb-3">
                  <ImageIcon size={32} className="mx-auto" />
                </div>
                <p className="text-gray-500 mb-3">
                  No images in the gallery yet
                </p>
                <Button size="sm" onClick={addItem}>
                  <Plus size={16} className="mr-1" />
                  Add First Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GalleryEditor;
