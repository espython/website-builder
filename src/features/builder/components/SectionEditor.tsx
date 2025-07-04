'use client';

import { useState } from 'react';
import {
  useSelectedSection,
  useUpdateSection,
  useDeleteSection,
} from '@/features/sections/hooks/sections-hook';
import { SectionType } from '@/features/sections/types/section';
import { Trash2 } from 'lucide-react';
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
import AddSectionButton from '@/features/sections/components/AddSectionButton';

const SectionEditor = () => {
  const selectedSection = useSelectedSection();
  const updateSection = useUpdateSection();
  const deleteSection = useDeleteSection();

  // Handle delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!selectedSection) {
    return (
      <div className="p-6 text-center">
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No Section Selected
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Select a section from the preview area to edit its properties
          </p>
          <div className="flex justify-center">
            <AddSectionButton />
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteSection = () => {
    if (showDeleteConfirm) {
      deleteSection(selectedSection.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  // Determine which editor to render based on section type
  const renderEditor = () => {
    switch (selectedSection.type) {
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
          <div className="p-6 text-center">
            <p className="text-gray-500">
              No editor available for this section type: {selectedSection.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Edit{' '}
          {selectedSection.type.charAt(0).toUpperCase() +
            selectedSection.type.slice(1)}{' '}
          Section
        </h2>

        <button
          className={`p-2 rounded-md ${
            showDeleteConfirm
              ? 'bg-red-500 text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={handleDeleteSection}
          title={showDeleteConfirm ? 'Confirm Delete' : 'Delete Section'}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm">
          <p className="text-red-800 font-medium mb-2">
            Are you sure you want to delete this section?
          </p>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white"
              onClick={() => {
                deleteSection(selectedSection.id);
                setShowDeleteConfirm(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200">
        {renderEditor()}
      </div>
    </div>
  );
};

export default SectionEditor;
