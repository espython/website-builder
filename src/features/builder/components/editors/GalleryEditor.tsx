'use client';

import { Section, GalleryContent } from '@/features/sections/types/section';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { GalleryItemsList } from './gallery/GalleryItemsList';
import { BaseEditorProps } from './types';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { useGalleryEditor } from '../../hooks/useGalleryEditor';

interface GalleryEditorProps extends BaseEditorProps {
  section: Section;
}

const GalleryEditor = ({ section, updateSection }: GalleryEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<GalleryContent>(
    section,
    updateSection
  );

  // Use our gallery-specific hook for specialized logic
  const {
    title,
    description,
    items,
    handleHeaderChange,
    handleItemsChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
  } = useGalleryEditor({
    content,
    onContentChange: handleChange,
  });

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Gallery Content
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gallery-title">Title</Label>
            <Input
              id="gallery-title"
              value={title}
              onChange={(e) => handleHeaderChange('title', e.target.value)}
              placeholder="Gallery Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gallery-description">Description</Label>
            <Textarea
              id="gallery-description"
              value={description}
              onChange={(e) =>
                handleHeaderChange('description', e.target.value)
              }
              placeholder="Gallery Description"
              rows={2}
            />
          </div>

          {/* Gallery Items */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Gallery Items</h4>
                <Button size="sm" onClick={handleAddItem}>
                  <Plus size={16} className="mr-1" />
                  Add Image
                </Button>
              </div>

              {items && items.length > 0 ? (
                <GalleryItemsList
                  items={items}
                  onItemsChange={handleItemsChange}
                  onRemoveItem={handleRemoveItem}
                  onChangeItem={handleItemChange}
                />
              ) : (
                <div className="text-center p-6 border border-dashed rounded-md border-gray-300">
                  <div className="text-gray-400 mb-3">
                    <ImageIcon size={32} className="mx-auto" />
                  </div>
                  <p className="text-gray-500 mb-3">
                    No images in the gallery yet
                  </p>
                  <Button size="sm" onClick={handleAddItem}>
                    <Plus size={16} className="mr-1" />
                    Add First Image
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
