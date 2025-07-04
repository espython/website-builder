'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  CTAContent,
  SectionContent,
} from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';

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
          <input
            type="text"
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={content.buttonText || ''}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Link
            </label>
            <input
              type="text"
              value={content.buttonLink || ''}
              onChange={(e) => handleChange('buttonLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Image URL
          </label>
          <input
            type="text"
            value={content.backgroundImage || ''}
            onChange={(e) => handleChange('backgroundImage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Overlay
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={content.overlay !== false}
              onChange={(e) =>
                handleChange('overlay', e.target.checked ? 'true' : 'false')
              }
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">
              Enable dark overlay on background
            </span>
          </div>
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

export default CTAEditor;
