import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { InlineEditableField } from '@/features/sections/components/common/InlineEditableField';
import { CTAContent } from '@/features/sections/types/section';
import BackgroundSettings from './BackgroundSettings';

interface CTAContentFormProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  overlay: boolean;
  onTextChange: (field: keyof CTAContent, value: string) => void;
  onButtonLinkChange: (value: string) => void;
  onBackgroundChange: (value: string) => void;
  onOverlayToggle: (checked: boolean) => void;
}

const CTAContentForm = memo(
  ({
    title,
    description,
    buttonText,
    buttonLink,
    backgroundImage,
    overlay,
    onTextChange,
    onButtonLinkChange,
    onBackgroundChange,
    onOverlayToggle,
  }: CTAContentFormProps) => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <div className="p-2 border rounded-md">
            <InlineEditableField
              value={title}
              onChange={(newValue) => onTextChange('title', newValue)}
              isEditable={true}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <div className="p-2 border rounded-md min-h-[80px]">
            <InlineEditableField
              value={description}
              onChange={(newValue) => onTextChange('description', newValue)}
              isEditable={true}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buttonText">Button Text</Label>
            <div className="p-2 border rounded-md">
              <InlineEditableField
                value={buttonText}
                onChange={(newValue) => onTextChange('buttonText', newValue)}
                isEditable={true}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buttonLink">Button Link</Label>
            <Input
              id="buttonLink"
              type="text"
              value={buttonLink}
              onChange={(e) => onButtonLinkChange(e.target.value)}
              placeholder="#contact or https://example.com"
            />
          </div>
        </div>

        <BackgroundSettings
          backgroundImage={backgroundImage}
          overlay={overlay}
          onBackgroundChange={onBackgroundChange}
          onOverlayToggle={onOverlayToggle}
        />
      </div>
    );
  }
);

CTAContentForm.displayName = 'CTAContentForm';

export default CTAContentForm;
