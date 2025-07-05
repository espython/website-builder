import React, { memo } from 'react';
import {
  HeroContent,
  Section,
  SectionType,
  FeaturesContent,
  TextContent,
  PricingContent,
  TestimonialsContent,
  ContactContent,
  GalleryContent,
  CTAContent,
  HeaderContent,
  FooterContent,
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
import { PreviewMode } from '../store/uiStore';

interface SectionRendererProps {
  section: Section;
  isSelected: boolean;
  onClick: () => void;
  previewMode: PreviewMode;
}

const SectionRenderer = memo(
  ({ section, isSelected, onClick, previewMode }: SectionRendererProps) => {
    // Apply common wrapper styles for selection indicator
    const wrapperClassName = `relative ${
      isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''
    }`;

    // Render the component based on section type
    switch (section.type) {
      case SectionType.HERO:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <HeroSection
              content={section.content as HeroContent}
              isSelected={isSelected}
              onClick={onClick}
              previewMode={previewMode}
              id={section.id}
            />
          </div>
        );

      case SectionType.FEATURES:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <FeaturesSection
              content={section.content as FeaturesContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.TEXT:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <TextSection
              content={section.content as TextContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.PRICING:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <PricingSection
              content={section.content as PricingContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.TESTIMONIALS:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <TestimonialsSection
              content={section.content as TestimonialsContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.CONTACT:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <ContactSection
              content={section.content as ContactContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.GALLERY:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <GallerySection
              content={section.content as GalleryContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.CTA:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <CtaSection
              content={section.content as CTAContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.HEADER:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <HeaderSection
              content={section.content as HeaderContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      case SectionType.FOOTER:
        return (
          <div className={wrapperClassName} onClick={onClick}>
            <FooterSection
              content={section.content as FooterContent}
              isSelected={isSelected}
              onClick={onClick}
              id={section.id}
              previewMode={previewMode}
            />
          </div>
        );

      default:
        return (
          <div
            className={`${wrapperClassName} p-6 bg-gray-100 text-center`}
            onClick={onClick}
          >
            <p className="text-gray-500">Unknown section type</p>
          </div>
        );
    }
  }
);

SectionRenderer.displayName = 'SectionRenderer';

export default SectionRenderer;
