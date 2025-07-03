'use client';

import { useState } from 'react';
import {
  Plus,
  X,
  Layout,
  Image,
  FileText,
  MessageSquare,
  Grid,
  Mail,
  Store,
  CheckCircle,
} from 'lucide-react';
import { useAddSection } from '@/features/sections/hooks/sections-hook';
import { SectionType } from '@/features/sections/types/section';
import { generateSampleContent } from '@/features/sections/utils/sample-content';

export default function AddSectionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const addSection = useAddSection();

  const handleAddSection = (type: SectionType) => {
    // Generate sample content based on section type
    const sampleContent = generateSampleContent(type);
    addSection(type, sampleContent);
    setIsOpen(false);
  };

  const sectionTypes = [
    { type: SectionType.HEADER, icon: Layout, label: 'Header' },
    { type: SectionType.HERO, icon: Image, label: 'Hero' },
    { type: SectionType.FEATURES, icon: CheckCircle, label: 'Features' },
    { type: SectionType.TEXT, icon: FileText, label: 'Text' },
    { type: SectionType.GALLERY, icon: Grid, label: 'Gallery' },
    {
      type: SectionType.TESTIMONIALS,
      icon: MessageSquare,
      label: 'Testimonials',
    },
    { type: SectionType.PRICING, icon: Store, label: 'Pricing' },
    { type: SectionType.CTA, icon: CheckCircle, label: 'CTA' },
    { type: SectionType.CONTACT, icon: Mail, label: 'Contact' },
    { type: SectionType.FOOTER, icon: Layout, label: 'Footer' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
      >
        {isOpen ? <X size={16} /> : <Plus size={16} />}
        <span>Add Section</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-md shadow-lg p-2 border border-gray-200 grid grid-cols-2 gap-1">
          {sectionTypes.map((section) => (
            <button
              key={section.type}
              onClick={() => handleAddSection(section.type)}
              className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-md transition-colors"
            >
              <section.icon size={24} className="text-blue-600 mb-1" />
              <span className="text-sm text-gray-700">{section.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
