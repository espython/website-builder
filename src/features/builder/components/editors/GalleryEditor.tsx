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
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface GalleryEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const GalleryEditor = ({ section, updateSection }: GalleryEditorProps) => {
  const { saveAndClose, isSaved } = useSectionEditor(section, updateSection);
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

  // Reorder gallery items
  const moveItem = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      fromIndex >= content.items.length ||
      toIndex < 0 ||
      toIndex >= content.items.length
    ) {
      return;
    }

    const updatedItems = [...content.items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    handleChange('items', updatedItems);
  };

  // Move item up
  const moveItemUp = (index: number) => {
    moveItem(index, index - 1);
  };

  // Move item down
  const moveItemDown = (index: number) => {
    moveItem(index, index + 1);
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
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Gallery Items</h4>
              <Button type="button" onClick={addItem} size="sm" className="h-8">
                <Plus size={14} className="mr-1" />
                Add Image
              </Button>
            </div>

            {content.items.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
                <div className="flex flex-col items-center">
                  <ImageIcon size={36} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">
                    No gallery items added yet
                  </p>
                  <Button type="button" onClick={addItem} size="sm">
                    Add First Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {content.items.map((item, index) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <GripVertical
                            size={16}
                            className="text-gray-400 mr-2"
                          />
                          <span className="text-sm font-medium">
                            Image {index + 1}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            onClick={() => moveItemUp(index)}
                            disabled={index === 0}
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-8 w-8 ${index === 0 ? 'text-gray-300' : 'text-gray-500'}`}
                            title="Move up"
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            onClick={() => moveItemDown(index)}
                            disabled={index === content.items.length - 1}
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-8 w-8 ${index === content.items.length - 1 ? 'text-gray-300' : 'text-gray-500'}`}
                            title="Move down"
                          >
                            ↓
                          </Button>
                          <Button
                            type="button"
                            onClick={() => removeItem(index)}
                            variant="ghost"
                            size="sm"
                            className="p-1 h-8 w-8 text-gray-400 hover:text-red-500"
                            title="Remove"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={
                                  item.caption || `Gallery item ${index + 1}`
                                }
                                className="w-full h-full object-cover"
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
                            <Label
                              htmlFor={`image-${index}`}
                              className="text-xs"
                            >
                              Image URL
                            </Label>
                            <Input
                              id={`image-${index}`}
                              type="text"
                              value={item.image || ''}
                              onChange={(e) =>
                                handleItemChange(index, 'image', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor={`caption-${index}`}
                              className="text-xs"
                            >
                              Caption
                            </Label>
                            <Input
                              id={`caption-${index}`}
                              type="text"
                              value={item.caption || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  'caption',
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor={`link-${index}`}
                              className="text-xs"
                            >
                              Link URL (optional)
                            </Label>
                            <Input
                              id={`link-${index}`}
                              type="text"
                              value={item.link || ''}
                              onChange={(e) =>
                                handleItemChange(index, 'link', e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-4">
        <Button
          onClick={saveAndClose}
          variant={isSaved ? 'outline' : 'default'}
          className={
            isSaved ? 'bg-green-600 text-white hover:bg-green-700' : ''
          }
        >
          {isSaved ? 'Saved ✓' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default GalleryEditor;
