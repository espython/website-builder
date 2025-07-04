'use client';

import {
  Section,
  HeroContent,
  SectionContent,
} from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';

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
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
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
            Alignment
          </label>
          <div className="flex space-x-4">
            {['left', 'center', 'right'].map((alignment) => (
              <label key={alignment} className="flex items-center">
                <input
                  type="radio"
                  name="alignment"
                  value={alignment}
                  checked={content.alignment === alignment}
                  onChange={() => handleChange('alignment', alignment)}
                  className="mr-2"
                />
                <span className="text-sm capitalize">{alignment}</span>
              </label>
            ))}
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

export default HeroEditor;
