'use client';

import { Section, ContactContent } from '@/features/sections/types/section';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useSectionEditor } from '../../hooks/useSectionEditor';
import { useContactForm } from '../../hooks/useContactForm';
import SocialLinksList from './contact/SocialLinksList';
import { BaseEditorProps } from './types';

interface ContactEditorProps extends BaseEditorProps {
  section: Section;
}

const ContactEditor = ({ section, updateSection }: ContactEditorProps) => {
  // Use the standardized section editor hook for consistent behavior
  const { content, handleChange } = useSectionEditor<ContactContent>(
    section,
    updateSection
  );

  // Use the contact form hook to manage all social link-related logic
  const { handleSocialLinkChange, addSocialLink, removeSocialLink } =
    useContactForm({
      content,
      onContentChange: handleChange,
    });

  // Ensure socialLinks array always exists
  const socialLinks = content?.socialLinks || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={content?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Contact section title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Contact section description"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={content?.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={content?.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={content?.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="123 Main St, City, Country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mapUrl">Map URL</Label>
          <Input
            id="mapUrl"
            type="url"
            value={content?.mapUrl || ''}
            onChange={(e) => handleChange('mapUrl', e.target.value)}
            placeholder="https://maps.google.com/embed?pb=..."
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="showForm"
            checked={content?.showForm === true}
            onCheckedChange={(checked) => handleChange('showForm', !!checked)}
          />
          <Label
            htmlFor="showForm"
            className="text-sm font-normal cursor-pointer"
          >
            Show contact form
          </Label>
        </div>

        <SocialLinksList
          socialLinks={socialLinks}
          handleSocialLinkChange={handleSocialLinkChange}
          addSocialLink={addSocialLink}
          removeSocialLink={removeSocialLink}
        />
      </div>
    </div>
  );
};

export default ContactEditor;
