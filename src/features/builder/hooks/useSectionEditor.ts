import { useState, useEffect } from 'react';
import {
  FeatureItem,
  GalleryItem,
  MenuItem,
  PricingPlan,
  Section,
  SectionContent,
  Testimonial,
} from '@/features/sections/types/section';
import { useSelectSection } from '@/features/sections/hooks/sections-hook';

/**
 * Type for section content field values
 */
export type SectionFieldValue =
  | SectionContent
  | string
  | boolean
  | FeatureItem[]
  | MenuItem[]
  | PricingPlan[]
  | Testimonial[]
  | GalleryItem[];

/**
 * A custom hook that provides standardized section editing functionality
 * with debounced auto-save and save status tracking
 *
 * @param section The section being edited
 * @param updateSection Function to update the section in the store
 * @param debounceTime Optional debounce time in ms (default: 500ms)
 * @returns An object with content state, setter, save status and functions
 */
export function useSectionEditor<T extends SectionContent>(
  section: Section,
  updateSection: (id: string, content: SectionContent) => void,
  debounceTime = 500
) {
  // Initialize content state from section props
  const [content, setContent] = useState<T>(section?.content as T);

  // Track save status
  const [isSaved, setIsSaved] = useState(true);

  // Get the section selection function to close the editor
  const selectSection = useSelectSection();

  // Update local state when section changes (e.g. when switching between sections)
  useEffect(() => {
    if (!section) return;
    setContent(section.content as T);
    setIsSaved(true);
  }, [section?.id, section?.content]);

  // Handle field changes
  const handleChange = (field: keyof T, value: SectionFieldValue) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSaved(false);
  };

  // Save changes immediately and update status
  const handleSave = () => {
    updateSection(section?.id, content);
    setIsSaved(true);
  };

  // Save changes and close the editor
  const saveAndClose = () => {
    updateSection(section?.id, content);
    setIsSaved(true);
    selectSection(''); // Deselect the section to close the editor
  };

  // Debounced auto-save
  useEffect(() => {
    // Skip initial render or when content equals section content
    if (
      !section ||
      JSON.stringify(content) === JSON.stringify(section.content)
    ) {
      return;
    }

    // Set unsaved status
    setIsSaved(false);

    // Set up debounce timer
    const timer = setTimeout(() => {
      updateSection(section?.id, content);
      setIsSaved(true);
    }, debounceTime);

    // Cleanup timer on component unmount or content change
    return () => clearTimeout(timer);
  }, [content, section?.id, section?.content, updateSection, debounceTime]);

  return {
    content,
    setContent, // In case direct state update is needed
    isSaved,
    handleChange,
    handleSave,
    saveAndClose,
  };
}
