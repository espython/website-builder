import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

type Alignment = 'left' | 'center' | 'right';

interface AlignmentSelectorProps {
  value: string;
  onChange: (value: Alignment) => void;
}

const AlignmentSelector = memo(
  ({ value, onChange }: AlignmentSelectorProps) => {
    const alignmentOptions: Alignment[] = ['left', 'center', 'right'];

    return (
      <div className="space-y-2">
        <Label>Alignment</Label>
        <RadioGroup
          value={value}
          onValueChange={onChange as (value: string) => void}
          className="flex space-x-4"
        >
          {alignmentOptions.map((alignment) => (
            <div key={alignment} className="flex items-center space-x-2">
              <RadioGroupItem value={alignment} id={`alignment-${alignment}`} />
              <Label
                htmlFor={`alignment-${alignment}`}
                className="capitalize cursor-pointer"
              >
                {alignment}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }
);

AlignmentSelector.displayName = 'AlignmentSelector';

export default AlignmentSelector;
