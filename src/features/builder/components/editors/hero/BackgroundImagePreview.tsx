import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';

interface BackgroundImagePreviewProps {
  imageUrl: string;
  onChange: (value: string) => void;
}

const BackgroundImagePreview = memo(
  ({ imageUrl, onChange }: BackgroundImagePreviewProps) => {
    return (
      <div className="space-y-2">
        <Label htmlFor="backgroundImage">Background Image URL</Label>
        <Input
          id="backgroundImage"
          type="text"
          value={imageUrl || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />

        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Background preview"
              className="max-h-32 rounded-md object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/800x400?text=Image+Not+Found';
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

BackgroundImagePreview.displayName = 'BackgroundImagePreview';

export default BackgroundImagePreview;
