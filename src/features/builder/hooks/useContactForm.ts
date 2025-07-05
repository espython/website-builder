import { useCallback } from 'react';
import { ContactContent, FooterLink } from '@/features/sections/types/section';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';

interface UseContactFormProps {
  content: ContactContent;
  onContentChange: (
    field: keyof ContactContent,
    value: SectionFieldValue
  ) => void;
}

export const useContactForm = ({
  content,
  onContentChange,
}: UseContactFormProps) => {
  // Handle social link changes
  const handleSocialLinkChange = useCallback(
    (index: number, field: keyof FooterLink, value: string) => {
      const updatedLinks = [...(content.socialLinks || [])];
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
      onContentChange('socialLinks', updatedLinks);
    },
    [content.socialLinks, onContentChange]
  );

  // Add new social link
  const addSocialLink = useCallback(() => {
    const updatedLinks = [
      ...(content.socialLinks || []),
      { label: '', link: '' },
    ];
    onContentChange('socialLinks', updatedLinks as FooterLink[]);
  }, [content.socialLinks, onContentChange]);

  // Remove social link
  const removeSocialLink = useCallback(
    (index: number) => {
      const updatedLinks = [...(content.socialLinks || [])];
      updatedLinks.splice(index, 1);
      onContentChange('socialLinks', updatedLinks);
    },
    [content.socialLinks, onContentChange]
  );

  return {
    handleSocialLinkChange,
    addSocialLink,
    removeSocialLink,
  };
};
