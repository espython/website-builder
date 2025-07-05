import React, { memo } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { InlineEditableField } from '@/features/sections/components/common/InlineEditableField';
import { CTAContent } from '@/features/sections/types/section';

interface CTAPreviewProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  overlay: boolean;
  onTextChange: (field: keyof CTAContent, value: string) => void;
}

const CTAPreview = memo(
  ({
    title,
    description,
    buttonText,
    backgroundImage,
    overlay,
    onTextChange,
  }: CTAPreviewProps) => {
    return (
      <Card
        className="relative overflow-hidden rounded-md mb-4"
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { backgroundColor: '#2563eb' }
        }
      >
        {/* Dark overlay for image backgrounds */}
        {backgroundImage && overlay && (
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        )}

        <div className="relative z-10 p-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              <InlineEditableField
                value={title}
                onChange={(newValue) => onTextChange('title', newValue)}
                isEditable={true}
                className="inline-block text-white"
              />
            </h2>

            {description && (
              <p className="text-base mb-6 text-white text-opacity-90">
                <InlineEditableField
                  value={description}
                  onChange={(newValue) => onTextChange('description', newValue)}
                  isEditable={true}
                  className="inline-block text-white text-opacity-90"
                />
              </p>
            )}

            {buttonText && (
              <Button
                variant="default"
                size="lg"
                className="bg-white hover:bg-gray-100 text-blue-600 font-medium transition-colors shadow-md"
              >
                <InlineEditableField
                  value={buttonText}
                  onChange={(newValue) => onTextChange('buttonText', newValue)}
                  isEditable={true}
                />
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

CTAPreview.displayName = 'CTAPreview';

export default CTAPreview;
