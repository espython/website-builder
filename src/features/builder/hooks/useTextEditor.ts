import { useCallback } from 'react';
import { TextContent } from '@/features/sections/types/section';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';

interface UseTextEditorProps {
  content: TextContent;
  onContentChange: (field: keyof TextContent, value: SectionFieldValue) => void;
}

export const useTextEditor = ({
  content,
  onContentChange,
}: UseTextEditorProps) => {
  // Handle title change
  const handleTitleChange = useCallback(
    (value: string) => {
      onContentChange('title', value);
    },
    [onContentChange]
  );

  // Handle HTML content change
  const handleContentChange = useCallback(
    (value: string) => {
      onContentChange('content', value);
    },
    [onContentChange]
  );

  return {
    title: content?.title || '',
    htmlContent: content?.content || '',
    handleTitleChange,
    handleContentChange,
  };
};
