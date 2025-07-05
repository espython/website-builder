import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { FeatureItem } from '@/features/sections/types/section';
import { X, Plus } from 'lucide-react';

interface FeatureFormProps {
  feature: Partial<FeatureItem>;
  isEditing: boolean;
  onSave: () => void;
  onCancel?: () => void;
  onChange: (field: keyof FeatureItem, value: string) => void;
}

const FeatureForm = memo(
  ({ feature, isEditing, onSave, onCancel, onChange }: FeatureFormProps) => {
    const title = isEditing ? 'Edit Feature' : 'Add New Feature';
    const buttonText = isEditing ? 'Update Feature' : 'Add Feature';
    const buttonIcon = isEditing ? null : <Plus size={16} className="mr-1" />;
    const isDisabled = !feature.title;

    return (
      <div className="space-y-3">
        {isEditing && (
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-800">{title}</h4>
            {onCancel && (
              <Button
                onClick={onCancel}
                variant="ghost"
                size="sm"
                className="p-1 text-gray-500 hover:text-gray-700 h-8 w-8"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        )}

        {!isEditing && (
          <h4 className="font-medium text-gray-700 mb-3 text-sm">{title}</h4>
        )}

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit' : 'new'}-title`}>Title</Label>
            <Input
              id={`${isEditing ? 'edit' : 'new'}-title`}
              type="text"
              value={feature.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Feature title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit' : 'new'}-description`}>
              Description
            </Label>
            <Textarea
              id={`${isEditing ? 'edit' : 'new'}-description`}
              value={feature.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              rows={2}
              placeholder="Feature description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit' : 'new'}-icon`}>
              Icon (optional)
            </Label>
            <Input
              id={`${isEditing ? 'edit' : 'new'}-icon`}
              type="text"
              value={feature.icon || ''}
              onChange={(e) => onChange('icon', e.target.value)}
              placeholder="Icon name or URL"
            />
          </div>

          <div className="pt-2">
            <Button
              onClick={onSave}
              disabled={isDisabled}
              className={isDisabled ? 'bg-gray-200 text-gray-500' : ''}
              variant={!isDisabled ? 'default' : 'outline'}
            >
              {buttonIcon}
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

FeatureForm.displayName = 'FeatureForm';

export default FeatureForm;
