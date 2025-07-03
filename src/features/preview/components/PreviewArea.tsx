'use client';

import { useSectionsStore } from '@/features/sections/store/sectionsStore';
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
import { useCallback } from 'react';

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

// Create a preview component that manages displaying the right section
const PreviewArea = () => {
  const sections = useSectionsStore((state) => state.sections);
  const selectedSectionId = useSectionsStore(
    (state) => state.selectedSectionId
  );
  const selectSection = useSectionsStore((state) => state.selectSection);

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

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      {sections.length > 0 ? (
        <div className="min-h-full flex flex-col">
          {sections.map(renderSection)}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8 max-w-md">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Your website is empty
            </h3>
            <p className="text-gray-500">
              Get started by adding sections from the editor panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;
