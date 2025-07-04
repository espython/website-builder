'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  CTAContent,
  SectionContent,
} from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';

interface CTAEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const CTAEditor = ({ section, updateSection }: CTAEditorProps) => {
  const { saveAndClose, isSaved } = useSectionEditor(section, updateSection);
  const [content, setContent] = useState<CTAContent>(
    section.content as CTAContent
  );

  // Update local state when section changes
  useEffect(() => {
    setContent(section.content as CTAContent);
  }, [section.id, section.content]);

  // Handle input changes
  const handleChange = (field: keyof CTAContent, value: string) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
  };

  // Debounced auto-save when changes are made
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSection(section.id, content);
    }, 500);

    return () => clearTimeout(timer);
  }, [content, section.id, updateSection]);

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Call to Action Content
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
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buttonText">Button Text</Label>
            <Input
              id="buttonText"
              type="text"
              value={content.buttonText || ''}
              onChange={(e) => handleChange('buttonText', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buttonLink">Button Link</Label>
            <Input
              id="buttonLink"
              type="text"
              value={content.buttonLink || ''}
              onChange={(e) => handleChange('buttonLink', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundImage">Background Image URL</Label>
          <Input
            id="backgroundImage"
            type="text"
            value={content.backgroundImage || ''}
            onChange={(e) => handleChange('backgroundImage', e.target.value)}
          />

          {content.backgroundImage && (
            <div className="mt-2">
              <img
                src={content.backgroundImage}
                alt="Background preview"
                className="max-h-32 rounded-md object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/800x400?text=Image+Not+Found';
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="overlay"
              checked={content.overlay !== false}
              onCheckedChange={(checked) =>
                handleChange('overlay', checked ? 'true' : 'false')
              }
            />
            <Label
              htmlFor="overlay"
              className="text-sm text-gray-500 font-normal"
            >
              Enable dark overlay on background
            </Label>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
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

export default CTAEditor;
