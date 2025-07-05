import { useState, useEffect, useCallback } from 'react';
import { Section, SectionContent } from '@/features/sections/types/section';

/**
 * Custom hook to manage section content state with auto-save functionality
 * This reduces repetitive state management code across all editor components
 */
export function useSectionContent<T extends SectionContent>(
  section: Section,
  updateSection: (id: string, content: SectionContent) => void,
  initializer?: (content: T) => T
) {
  // Initialize content with proper type casting and optional initializer function
  const [content, setContent] = useState<T>(() => {
    const initialContent = section.content as T;
    return initializer ? initializer(initialContent) : initialContent;
  });

  // Handle input changes with proper type safety
  const handleChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setContent((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Debounced auto-save when changes are made
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSection(section.id, content);
    }, 500);

    return () => clearTimeout(timer);
  }, [content, section.id, updateSection]);

  return {
    content,
    setContent,
    handleChange,
  };
}
