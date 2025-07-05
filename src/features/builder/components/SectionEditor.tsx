'use client';

import { useState } from 'react';
import {
  useSelectedSection,
  useUpdateSection,
  useDeleteSection,
  useAddSection,
} from '@/features/sections/hooks/sections-hook';
import { Section, SectionType } from '@/features/sections/types/section';
import {
  Trash2,
  Layout,
  Image,
  FileText,
  MessageSquare,
  Grid,
  Mail,
  Store,
  CheckCircle,
  Save,
} from 'lucide-react';
import HeroEditor from './editors/HeroEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import TextEditor from './editors/TextEditor';
import PricingEditor from './editors/PricingEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';
import ContactEditor from './editors/ContactEditor';
import GalleryEditor from './editors/GalleryEditor';
import CTAEditor from './editors/CTAEditor';
import HeaderEditor from './editors/HeaderEditor';
import FooterEditor from './editors/FooterEditor';
import { generateSampleContent } from '@/features/sections/utils/sample-content';
import { Button } from '@/shared/components/ui/button';
import { useSectionEditor } from '../hooks/useSectionEditor';

// Define section types with their icons
const sectionTypes = [
  { type: SectionType.HEADER, label: 'Header', icon: Layout },
  { type: SectionType.HERO, label: 'Hero', icon: Image },
  { type: SectionType.FEATURES, label: 'Features', icon: CheckCircle },
  { type: SectionType.TEXT, label: 'Text', icon: FileText },
  { type: SectionType.GALLERY, label: 'Gallery', icon: Grid },
  {
    type: SectionType.TESTIMONIALS,
    label: 'Testimonials',
    icon: MessageSquare,
  },
  { type: SectionType.PRICING, label: 'Pricing', icon: Store },
  { type: SectionType.CTA, label: 'CTA', icon: CheckCircle },
  { type: SectionType.CONTACT, label: 'Contact', icon: Mail },
  { type: SectionType.FOOTER, label: 'Footer', icon: Layout },
];

const SectionEditor = () => {
  const selectedSection = useSelectedSection();
  const updateSection = useUpdateSection();
  const deleteSection = useDeleteSection();
  const addSection = useAddSection();
  const { saveAndClose } = useSectionEditor(
    selectedSection as Section,
    updateSection
  );

  const handleAddSection = (type: SectionType) => {
    // Generate sample content based on section type
    const sampleContent = generateSampleContent(type);
    addSection(type, sampleContent);
  };

  // Handle delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Save section changes
  const handleSaveSection = () => {
    if (selectedSection) {
      updateSection(selectedSection.id, selectedSection.content);
      saveAndClose();
    }
  };

  if (!selectedSection) {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-medium text-center p-3 sm:p-4 border-b border-gray-100">
          Add Section
        </h2>
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-2  gap-2 sm:gap-3">
            {sectionTypes.map((section) => (
              <Button
                key={section.type}
                onClick={() => handleAddSection(section.type)}
                variant="outline"
              >
                <section.icon size={20} className="text-blue-600 mb-1" />
                <span className="text-xs sm:text-sm text-center text-gray-700">
                  {section.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteSection = () => {
    if (showDeleteConfirm) {
      deleteSection(selectedSection?.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  // Determine which editor to render based on section type
  const renderEditor = () => {
    switch (selectedSection?.type) {
      case SectionType.HERO:
        return (
          <HeroEditor section={selectedSection} updateSection={updateSection} />
        );
      case SectionType.FEATURES:
        return (
          <FeaturesEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      case SectionType.TEXT:
        return (
          <TextEditor section={selectedSection} updateSection={updateSection} />
        );
      case SectionType.PRICING:
        return (
          <PricingEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      case SectionType.TESTIMONIALS:
        return (
          <TestimonialsEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      case SectionType.CONTACT:
        return (
          <ContactEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      case SectionType.GALLERY:
        return (
          <GalleryEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      case SectionType.CTA:
        return (
          <CTAEditor section={selectedSection} updateSection={updateSection} />
        );
      case SectionType.HEADER:
        return (
          <HeaderEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      case SectionType.FOOTER:
        return (
          <FooterEditor
            section={selectedSection}
            updateSection={updateSection}
          />
        );
      default:
        return (
          <div className="p-4 sm:p-6 text-center">
            <p className="text-gray-500">
              No editor available for this section type: {selectedSection?.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="flex justify-between items-center p-3 sm:p-4">
          <div className="flex items-center">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {selectedSection.type.charAt(0).toUpperCase() +
                selectedSection?.type.slice(1)}{' '}
              Section
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              className="p-1.5 sm:p-2 rounded-md "
              variant="outline"
              onClick={handleSaveSection}
              title="Save Changes"
            >
              <Save size={16} className="sm:size-[18px]" />
            </Button>
            <Button
              className={`p-1.5 sm:p-2 rounded-md ${
                showDeleteConfirm
                  ? 'bg-red-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              variant={showDeleteConfirm ? 'destructive' : 'outline'}
              onClick={handleDeleteSection}
              title={showDeleteConfirm ? 'Confirm Delete' : 'Delete Section'}
            >
              <Trash2 size={16} className="sm:size-[18px]" />
            </Button>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mx-3 sm:mx-4 mb-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-md text-xs sm:text-sm">
            <p className="text-red-800 font-medium mb-2">
              Are you sure you want to delete this section?
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteSection(selectedSection.id);
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 sm:p-4">
          <div className="bg-white rounded-lg border border-gray-200">
            {renderEditor()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
