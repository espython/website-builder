'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  ContactContent,
  FooterLink,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Button } from '@/shared/components/ui/button';

interface ContactEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const ContactEditor = ({ section, updateSection }: ContactEditorProps) => {
  const [content, setContent] = useState<ContactContent>(
    section.content as ContactContent
  );

  // Update local state when section changes
  useEffect(() => {
    setContent(section.content as ContactContent);
  }, [section.id, section.content]);

  // Handle input changes
  const handleChange = (
    field: keyof ContactContent,
    value: string | boolean | FooterLink[]
  ) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
  };

  // Handle social link changes
  const handleSocialLinkChange = (
    index: number,
    field: keyof FooterLink,
    value: string
  ) => {
    const updatedLinks = [...(content.socialLinks || [])];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('socialLinks', updatedLinks);
  };

  // Add new social link
  const addSocialLink = () => {
    const updatedLinks = [
      ...(content.socialLinks || []),
      { label: '', link: '' },
    ];
    handleChange('socialLinks', updatedLinks as FooterLink[]);
  };

  // Remove social link
  const removeSocialLink = (index: number) => {
    const updatedLinks = [...(content.socialLinks || [])];
    updatedLinks.splice(index, 1);
    handleChange('socialLinks', updatedLinks);
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
          Contact Information
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={content.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={content.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            value={content.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mapUrl">Map URL (Google Maps embed URL)</Label>
          <Input
            id="mapUrl"
            type="url"
            value={content.mapUrl || ''}
            onChange={(e) => handleChange('mapUrl', e.target.value)}
          />
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            id="showForm"
            checked={content.showForm === true}
            onCheckedChange={(checked) => handleChange('showForm', !!checked)}
          />
          <Label
            htmlFor="showForm"
            className="text-sm text-gray-700 font-normal"
          >
            Show contact form
          </Label>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Label className="block mb-2">Social Links</Label>

          {(content.socialLinks || []).map((link, index) => (
            <div key={index} className="flex mb-3 items-center">
              <div className="flex-1 mr-2">
                <Input
                  type="text"
                  value={link.label}
                  placeholder="Platform (e.g. Twitter)"
                  onChange={(e) =>
                    handleSocialLinkChange(index, 'label', e.target.value)
                  }
                />
              </div>
              <div className="flex-[2] mr-2">
                <Input
                  type="url"
                  value={link.link}
                  placeholder="URL (e.g. https://twitter.com/yourusername)"
                  onChange={(e) =>
                    handleSocialLinkChange(index, 'link', e.target.value)
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSocialLink(index)}
                className="p-2 text-gray-400 hover:text-red-500"
                aria-label="Remove social link"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSocialLink}
            className="mt-2 text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            + Add Social Link
          </Button>
        </div>
      </div>

      {/* Save button removed */}
    </div>
  );
};

export default ContactEditor;
