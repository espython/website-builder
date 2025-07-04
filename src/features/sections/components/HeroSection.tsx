'use client';

import { HeroContent } from '@/features/sections/types/section';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { InlineEditableField } from './common/InlineEditableField';
import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { Textarea } from '@/shared/components/ui/textarea';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface HeroSectionProps {
  content: HeroContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

// Custom component for multi-line text editing
interface InlineEditableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  isEditable: boolean;
  className?: string;
  placeholder?: string;
}

const InlineEditableTextarea = ({
  value,
  onChange,
  isEditable,
  className = '',
  placeholder = 'Edit text...',
}: InlineEditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const editableRef = useRef<HTMLDivElement>(null);

  // Update local state when prop value changes
  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
    }
  }, [value, isEditing]);

  // Handle clicking outside to save
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        editableRef.current &&
        !editableRef.current.contains(e.target as Node)
      ) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleStartEditing = (e: React.MouseEvent) => {
    if (!isEditable) return;
    e.stopPropagation(); // Prevent event bubbling
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue !== value) {
      onChange(editValue);
    }
    setIsEditing(false);
  };

  // Apply hover effect only when editable
  const containerClass = `${className} ${
    isEditable ? 'hover:bg-blue-50 rounded transition-colors px-2 py-1' : ''
  }`;

  if (isEditing) {
    return (
      <div
        className="flex flex-col"
        ref={editableRef}
        onClick={(e) => e.stopPropagation()}
      >
        <Textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={`mb-2 min-h-[100px]`}
          placeholder={placeholder}
          autoFocus
        />
        <Button
          onClick={handleSave}
          variant="default"
          size="sm"
          className="self-end text-white bg-green-600 hover:bg-green-700"
        >
          <Check size={16} className="mr-1" /> Save
        </Button>
      </div>
    );
  }

  return (
    <div onClick={handleStartEditing} className={containerClass}>
      {value || placeholder}
    </div>
  );
};

const HeroSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: HeroSectionProps) => {
  const updateSection = useUpdateSection();

  console.log('Hero content:', content);

  const handleFieldUpdate = (field: string, value: string) => {
    console.log('Updating hero field:', field, value); // Debug log

    // Create a completely new object for the content
    const updatedContent = JSON.parse(JSON.stringify(content));

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
      console.log('Updated description to:', updatedContent.description); // Debug log
    } else if (field === 'buttonText') {
      updatedContent.buttonText = value;
    }

    // Log the full content before updating
    console.log('Updating section with content:', updatedContent);
    updateSection(id, updatedContent);
  };

  // Determine background style
  const backgroundStyle = content.backgroundImage
    ? {
        backgroundImage: `url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: '#1d4ed8' }; // Fallback to a blue color

  console.log('Background image URL:', content.backgroundImage);
  console.log('Applied background style:', backgroundStyle);

  return (
    <Card
      className={`relative overflow-hidden rounded-none ${previewMode === 'mobile' ? 'py-6 px-2' : previewMode === 'tablet' ? 'py-8 px-4' : 'py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8'} cursor-pointer ${isSelected ? ' outline-2 outline-blue-500' : ''}`}
      style={backgroundStyle}
      onClick={onClick}
    >
      {/* Use modern Tailwind syntax and ensure proper layering */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div
        className={`container mx-auto text-center relative z-10 ${previewMode === 'mobile' ? 'px-2' : 'px-4'}`}
      >
        <h1
          className={`${previewMode === 'mobile' ? 'text-2xl' : previewMode === 'tablet' ? 'text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-white mb-4 sm:mb-6`}
        >
          <InlineEditableField
            value={content.title || ''}
            onChange={(newValue) => handleFieldUpdate('title', newValue)}
            isEditable={isSelected && previewMode === 'desktop'}
            className="inline-block"
          />
        </h1>

        <div
          className={`${previewMode === 'mobile' ? 'text-base' : previewMode === 'tablet' ? 'text-lg' : 'text-lg sm:text-xl md:text-2xl'} text-white mb-6 sm:mb-8`}
        >
          <InlineEditableTextarea
            value={content.description || ''}
            onChange={(newValue) => handleFieldUpdate('description', newValue)}
            isEditable={isSelected && previewMode === 'desktop'}
            className="inline-block text-left"
            placeholder="Add a description..."
          />
        </div>

        {content.buttonText && (
          <Button
            variant="default"
            size={previewMode === 'mobile' ? 'sm' : 'lg'}
            className={`bg-white text-gray-900 hover:bg-gray-100 ${previewMode === 'mobile' ? 'px-3 py-1 text-xs' : previewMode === 'tablet' ? 'px-4 py-2 text-sm' : 'px-4 sm:px-6 py-2 text-sm sm:text-base md:text-lg'}`}
            onClick={(e) => {
              if (isSelected) {
                e.stopPropagation();
              }
            }}
          >
            <InlineEditableField
              value={content.buttonText}
              onChange={(newValue) => handleFieldUpdate('buttonText', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
            />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default HeroSection;
