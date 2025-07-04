'use client';

import {
  Section,
  HeroContent,
  SectionContent,
} from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';

interface HeroEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const HeroEditor = ({ section, updateSection }: HeroEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange, saveAndClose, isSaved } =
    useSectionEditor<HeroContent>(section, updateSection);

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Hero Content
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
          <Label>Alignment</Label>
          <div className="flex space-x-4">
            {['left', 'center', 'right'].map((alignment) => (
              <div key={alignment} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`alignment-${alignment}`}
                  name="alignment"
                  value={alignment}
                  checked={content.alignment === alignment}
                  onChange={() => handleChange('alignment', alignment)}
                  className="text-slate-900 focus:ring-slate-900"
                />
                <Label
                  htmlFor={`alignment-${alignment}`}
                  className="capitalize"
                >
                  {alignment}
                </Label>
              </div>
            ))}
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

export default HeroEditor;
