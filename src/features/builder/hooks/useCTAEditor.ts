import { useCallback } from 'react';
import { CTAContent } from '@/features/sections/types/section';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';

interface UseCTAEditorProps {
  content: CTAContent;
  onContentChange: (field: keyof CTAContent, value: SectionFieldValue) => void;
}

export const useCTAEditor = ({
  content,
  onContentChange,
}: UseCTAEditorProps) => {
  // Handle text changes
  const handleTextChange = useCallback(
    (field: keyof CTAContent, value: string) => {
      onContentChange(field, value);
    },
    [onContentChange]
  );

  // Handle background image change
  const handleBackgroundImageChange = useCallback(
    (imageUrl: string) => {
      onContentChange('backgroundImage', imageUrl);
    },
    [onContentChange]
  );

  // Handle overlay toggle
  const handleOverlayToggle = useCallback(
    (checked: boolean) => {
      onContentChange('overlay', checked ? 'true' : 'false');
    },
    [onContentChange]
  );

  // Handle button link change
  const handleButtonLinkChange = useCallback(
    (link: string) => {
      onContentChange('buttonLink', link);
    },
    [onContentChange]
  );

  return {
    title: content?.title || '',
    description: content?.description || '',
    buttonText: content?.buttonText || '',
    buttonLink: content?.buttonLink || '',
    backgroundImage: content?.backgroundImage || '',
    overlay: content?.overlay !== false,
    handleTextChange,
    handleBackgroundImageChange,
    handleOverlayToggle,
    handleButtonLinkChange,
  };
};
