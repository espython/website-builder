import { useCallback } from 'react';
import { HeroContent } from '@/features/sections/types/section';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';

type Alignment = 'left' | 'center' | 'right';

interface UseHeroEditorProps {
  content: HeroContent;
  onContentChange: (field: keyof HeroContent, value: SectionFieldValue) => void;
}

export const useHeroEditor = ({
  content,
  onContentChange,
}: UseHeroEditorProps) => {
  // Handle alignment change
  const handleAlignmentChange = useCallback(
    (alignment: Alignment) => {
      onContentChange('alignment', alignment);
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

  // Handle button text change
  const handleButtonTextChange = useCallback(
    (text: string) => {
      onContentChange('buttonText', text);
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
    alignment: content.alignment || 'center',
    backgroundImage: content.backgroundImage || '',
    buttonText: content.buttonText || '',
    buttonLink: content.buttonLink || '',
    handleAlignmentChange,
    handleBackgroundImageChange,
    handleButtonTextChange,
    handleButtonLinkChange,
  };
};
