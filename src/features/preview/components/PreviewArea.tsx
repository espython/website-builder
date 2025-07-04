'use client';

import { useCallback, useState } from 'react';
import {
  useSections,
  useSelectedSectionId,
  useSelectSection,
} from '@/features/sections/hooks/sections-hook';
import {
  ContactContent,
  CTAContent,
  FeaturesContent,
  FooterContent,
  GalleryContent,
  HeaderContent,
  HeroContent,
  PricingContent,
  Section,
  SectionType,
  TestimonialsContent,
  TextContent,
} from '@/features/sections/types/section';

// Import all section components
import HeroSection from '@/features/sections/components/HeroSection';
import FeaturesSection from '@/features/sections/components/FeaturesSection';
import TextSection from '@/features/sections/components/TextSection';
import PricingSection from '@/features/sections/components/PricingSection';
import TestimonialsSection from '@/features/sections/components/TestimonialsSection';
import ContactSection from '@/features/sections/components/ContactSection';
import GallerySection from '@/features/sections/components/GallerySection';
import CtaSection from '@/features/sections/components/CtaSection';
import HeaderSection from '@/features/sections/components/HeaderSection';
import FooterSection from '@/features/sections/components/FooterSection';
import AddSectionButton from '@/features/sections/components/AddSectionButton';

// Import icons
import { Smartphone, Tablet, Monitor, ArrowDownUp, Eye } from 'lucide-react';

type PreviewMode = 'mobile' | 'tablet' | 'desktop';

// Create a preview component that manages displaying the right section
const PreviewArea = () => {
  const sections = useSections();
  const selectedSectionId = useSelectedSectionId();
  const selectSection = useSelectSection();
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const handleSectionClick = useCallback(
    (sectionId: string) => {
      selectSection(sectionId);
    },
    [selectSection]
  );

  // Render different components based on section type
  const renderSection = (section: Section) => {
    const isSelected = section.id === selectedSectionId;
    const onClick = () => handleSectionClick(section.id);

    switch (section.type) {
      case SectionType.HERO:
        return (
          <HeroSection
            key={section.id}
            content={section?.content as HeroContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.FEATURES:
        return (
          <FeaturesSection
            key={section.id}
            content={section.content as FeaturesContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.TEXT:
        return (
          <TextSection
            key={section.id}
            content={section.content as TextContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.PRICING:
        return (
          <PricingSection
            key={section.id}
            content={section.content as PricingContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.TESTIMONIALS:
        return (
          <TestimonialsSection
            key={section.id}
            content={section.content as TestimonialsContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.CONTACT:
        return (
          <ContactSection
            key={section.id}
            content={section.content as ContactContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.GALLERY:
        return (
          <GallerySection
            key={section.id}
            content={section.content as GalleryContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.CTA:
        return (
          <CtaSection
            key={section.id}
            content={section.content as CTAContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.HEADER:
        return (
          <HeaderSection
            key={section.id}
            content={section.content as HeaderContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      case SectionType.FOOTER:
        return (
          <FooterSection
            key={section.id}
            content={section.content as FooterContent}
            isSelected={isSelected}
            onClick={onClick}
          />
        );
      default:
        return null;
    }
  };

  // Get container width based on preview mode
  const getPreviewContainerClass = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto border-x border-gray-300 shadow-lg';
      case 'tablet':
        return 'max-w-2xl mx-auto border-x border-gray-300 shadow-lg';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preview toolbar */}
      <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-500">Preview</div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`p-1.5 rounded-md ${
              previewMode === 'mobile'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Mobile view"
          >
            <Smartphone size={18} />
          </button>
          <button
            onClick={() => setPreviewMode('tablet')}
            className={`p-1.5 rounded-md ${
              previewMode === 'tablet'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Tablet view"
          >
            <Tablet size={18} />
          </button>
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`p-1.5 rounded-md ${
              previewMode === 'desktop'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Desktop view"
          >
            <Monitor size={18} />
          </button>
          <div className="border-l border-gray-200 mx-2 h-6" />
          <button
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
            title="Preview in new tab"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div
          className={`bg-white transition-all duration-300 ${getPreviewContainerClass()}`}
        >
          {sections.length > 0 ? (
            <div className="min-h-full flex flex-col">
              {sections.map(renderSection)}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24">
              <div className="text-center p-8 max-w-md">
                <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
                  <ArrowDownUp size={24} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Your website is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by adding sections from the editor panel.
                </p>
                <AddSectionButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
