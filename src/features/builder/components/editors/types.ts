import { Section, SectionContent } from '@/features/sections/types/section';

/**
 * Base props interface for all editor components
 */
export interface BaseEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

/**
 * Type guard to check if an object is not null or undefined
 */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Type to extract the content type from a Section
 */
export type ExtractSectionContent<T extends Section> = T['content'];
