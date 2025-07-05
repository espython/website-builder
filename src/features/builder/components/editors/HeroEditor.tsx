'use client';

import { Section, HeroContent } from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { BaseEditorProps } from './types';
import { useHeroEditor } from '../../hooks/useHeroEditor';
import AlignmentSelector from './hero/AlignmentSelector';
import BackgroundImagePreview from './hero/BackgroundImagePreview';
import CallToActionFields from './hero/CallToActionFields';

interface HeroEditorProps extends BaseEditorProps {
  section: Section;
}

const HeroEditor = ({ section, updateSection }: HeroEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<HeroContent>(
    section,
    updateSection
  );

  // Use our hero-specific hook for specialized logic
  const {
    alignment,
    backgroundImage,
    buttonText,
    buttonLink,
    handleAlignmentChange,
    handleBackgroundImageChange,
    handleButtonTextChange,
    handleButtonLinkChange,
  } = useHeroEditor({
    content,
    onContentChange: handleChange,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={content?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Your hero title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Your hero description"
            rows={3}
          />
        </div>

        <CallToActionFields
          buttonText={buttonText}
          buttonLink={buttonLink}
          onTextChange={handleButtonTextChange}
          onLinkChange={handleButtonLinkChange}
        />

        <BackgroundImagePreview
          imageUrl={backgroundImage}
          onChange={handleBackgroundImageChange}
        />

        <AlignmentSelector value={alignment} onChange={handleAlignmentChange} />
      </div>
    </div>
  );
};

export default HeroEditor;
