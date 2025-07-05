'use client';

import { Section, CTAContent } from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { BaseEditorProps } from './types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useCTAEditor } from '../../hooks/useCTAEditor';
import CTAContentForm from './cta/CTAContentForm';
import CTAPreview from './cta/CTAPreview';

interface CTAEditorProps extends BaseEditorProps {
  section: Section;
}

const CTAEditor = ({ section, updateSection }: CTAEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<CTAContent>(
    section,
    updateSection
  );

  // Use our CTA-specific hook for specialized logic
  const {
    title,
    description,
    buttonText,
    buttonLink,
    backgroundImage,
    overlay,
    handleTextChange,
    handleBackgroundImageChange,
    handleOverlayToggle,
    handleButtonLinkChange,
  } = useCTAEditor({
    content,
    onContentChange: handleChange,
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <CTAContentForm
            title={title}
            description={description}
            buttonText={buttonText}
            buttonLink={buttonLink}
            backgroundImage={backgroundImage}
            overlay={overlay}
            onTextChange={handleTextChange}
            onButtonLinkChange={handleButtonLinkChange}
            onBackgroundChange={handleBackgroundImageChange}
            onOverlayToggle={handleOverlayToggle}
          />
        </TabsContent>

        <TabsContent value="preview">
          <CTAPreview
            title={title}
            description={description}
            buttonText={buttonText}
            backgroundImage={backgroundImage}
            overlay={overlay}
            onTextChange={handleTextChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CTAEditor;
