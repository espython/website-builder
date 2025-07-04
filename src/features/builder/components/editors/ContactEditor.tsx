'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  ContactContent,
  FooterLink,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash } from 'lucide-react';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';

interface ContactEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const ContactEditor = ({ section, updateSection }: ContactEditorProps) => {
  const { saveAndClose, isSaved } = useSectionEditor(section, updateSection);
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
      { name: '', url: '' },
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={content.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={content.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={content.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Map URL (Google Maps embed URL)
          </label>
          <input
            type="url"
            value={content.mapUrl || ''}
            onChange={(e) => handleChange('mapUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={content.showForm === true}
              onChange={(e) => handleChange('showForm', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Show contact form
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Links
          </label>

          {(content.socialLinks || []).map((link, index) => (
            <div key={index} className="flex mb-3 items-center">
              <div className="flex-1 mr-2">
                <input
                  type="text"
                  value={link.label}
                  placeholder="Platform (e.g. Twitter)"
                  onChange={(e) =>
                    handleSocialLinkChange(index, 'label', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-[2] mr-2">
                <input
                  type="url"
                  value={link.link}
                  placeholder="URL (e.g. https://twitter.com/yourusername)"
                  onChange={(e) =>
                    handleSocialLinkChange(index, 'link', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="p-2 text-gray-400 hover:text-red-500"
                aria-label="Remove social link"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSocialLink}
            className="mt-2 px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
          >
            + Add Social Link
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={saveAndClose}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ContactEditor;
