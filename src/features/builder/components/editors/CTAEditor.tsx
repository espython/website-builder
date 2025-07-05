'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  CTAContent,
  SectionContent,
} from '@/features/sections/types/section';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { InlineEditableField } from '@/features/sections/components/common/InlineEditableField';
import { Card } from '@/shared/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';

interface CTAEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const CTAEditor = ({ section, updateSection }: CTAEditorProps) => {
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
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
              Call to Action Content
            </h3>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <div className="p-2 border rounded-md">
                <InlineEditableField
                  value={content.title || ''}
                  onChange={(newValue) => handleChange('title', newValue)}
                  isEditable={true}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <div className="p-2 border rounded-md min-h-[80px]">
                <InlineEditableField
                  value={content.description || ''}
                  onChange={(newValue) => handleChange('description', newValue)}
                  isEditable={true}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <div className="p-2 border rounded-md">
                  <InlineEditableField
                    value={content.buttonText || ''}
                    onChange={(newValue) =>
                      handleChange('buttonText', newValue)
                    }
                    isEditable={true}
                    className="w-full"
                  />
                </div>
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
                onChange={(e) =>
                  handleChange('backgroundImage', e.target.value)
                }
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
        </TabsContent>

        <TabsContent value="preview">
          <Card
            className="relative overflow-hidden rounded-md mb-4"
            style={
              content.backgroundImage
                ? {
                    backgroundImage: `url(${content.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : { backgroundColor: '#2563eb' }
            }
          >
            {/* Dark overlay for image backgrounds */}
            {content.backgroundImage && content.overlay !== false && (
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            )}

            <div className="relative z-10 p-8">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  <InlineEditableField
                    value={content.title || ''}
                    onChange={(newValue) => handleChange('title', newValue)}
                    isEditable={true}
                    className="inline-block text-white"
                  />
                </h2>

                {content.description && (
                  <p className="text-base mb-6 text-white text-opacity-90">
                    <InlineEditableField
                      value={content.description || ''}
                      onChange={(newValue) =>
                        handleChange('description', newValue)
                      }
                      isEditable={true}
                      className="inline-block text-white text-opacity-90"
                    />
                  </p>
                )}

                {content.buttonText && (
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-blue-600 font-medium transition-colors shadow-md"
                  >
                    <InlineEditableField
                      value={content.buttonText || ''}
                      onChange={(newValue) =>
                        handleChange('buttonText', newValue)
                      }
                      isEditable={true}
                    />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Removed save button section */}
    </div>
  );
};

export default CTAEditor;
