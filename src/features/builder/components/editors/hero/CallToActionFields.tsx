import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';

interface CallToActionFieldsProps {
  buttonText: string;
  buttonLink: string;
  onTextChange: (value: string) => void;
  onLinkChange: (value: string) => void;
}

const CallToActionFields = memo(
  ({
    buttonText,
    buttonLink,
    onTextChange,
    onLinkChange,
  }: CallToActionFieldsProps) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            value={buttonText || ''}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Get Started"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonLink">Button Link</Label>
          <Input
            id="buttonLink"
            value={buttonLink || ''}
            onChange={(e) => onLinkChange(e.target.value)}
            placeholder="#contact"
          />
        </div>
      </div>
    );
  }
);

CallToActionFields.displayName = 'CallToActionFields';

export default CallToActionFields;
