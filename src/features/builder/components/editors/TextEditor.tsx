'use client';

import { Section, TextContent } from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { BaseEditorProps } from './types';
import { useTextEditor } from '../../hooks/useTextEditor';
import HTMLContentForm from './text/HTMLContentForm';
import HTMLContentPreview from './text/HTMLContentPreview';

interface TextEditorProps extends BaseEditorProps {
  section: Section;
}

const TextEditor = ({ section, updateSection }: TextEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<TextContent>(
    section,
    updateSection
  );

  // Use our text-specific hook for specialized logic
  const { title, htmlContent, handleTitleChange, handleContentChange } =
    useTextEditor({
      content,
      onContentChange: handleChange,
    });

  return (
    <div className="space-y-6">
      {/* HTML Content Form */}
      <HTMLContentForm
        title={title}
        htmlContent={htmlContent}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
      />

      {/* HTML Preview */}
      <HTMLContentPreview content={htmlContent} />
    </div>
  );
};

export default TextEditor;
