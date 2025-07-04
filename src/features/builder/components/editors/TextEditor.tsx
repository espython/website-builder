'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  SectionContent,
  TextContent,
} from '@/features/sections/types/section';

interface TextEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const TextEditor = ({ section, updateSection }: TextEditorProps) => {
  const [content, setContent] = useState<TextContent>(
    section.content as TextContent
  );

  // Update local state when section changes
  useEffect(() => {
    setContent(section.content as TextContent);
  }, [section.id, section.content]);

  // Handle input changes
  const handleChange = (field: keyof TextContent, value: string) => {
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
          Text Content
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
            HTML Content
          </label>
          <textarea
            value={content.content || ''}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="<p>Enter your HTML content here...</p>"
          ></textarea>
        </div>

        {/* Preview */}
        {content.content && (
          <div className="border border-gray-200 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Preview:</h4>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
