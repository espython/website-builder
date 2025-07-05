import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';

interface BackgroundSettingsProps {
  backgroundImage: string;
  overlay: boolean;
  onBackgroundChange: (value: string) => void;
  onOverlayToggle: (checked: boolean) => void;
}

const BackgroundSettings = memo(
  ({
    backgroundImage,
    overlay,
    onBackgroundChange,
    onOverlayToggle,
  }: BackgroundSettingsProps) => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="backgroundImage">Background Image URL</Label>
          <Input
            id="backgroundImage"
            type="text"
            value={backgroundImage}
            onChange={(e) => onBackgroundChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />

          {backgroundImage && (
            <div className="mt-2">
              <img
                src={backgroundImage}
                alt="Background preview"
                className="max-h-32 rounded-md object-cover w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/800x400?text=Image+Not+Found';
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="overlay"
            checked={overlay}
            onCheckedChange={onOverlayToggle}
          />
          <Label
            htmlFor="overlay"
            className="text-sm font-normal cursor-pointer"
          >
            Enable dark overlay on background
          </Label>
        </div>
      </div>
    );
  }
);

BackgroundSettings.displayName = 'BackgroundSettings';

export default BackgroundSettings;
