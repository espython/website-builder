'use client';

import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface InlineEditableFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditable: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

/**
 * A reusable component for inline editing of text fields
 * Displays content normally, but transforms into an input field when clicked
 */
export const InlineEditableField = ({
  value,
  onChange,
  isEditable,
  className = '',
  inputClassName = '',
  buttonClassName = '',
  placeholder = 'Edit text...',
  children,
}: InlineEditableFieldProps) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value); // Reset to original value
    }
  };

  // Apply hover effect only when editable
  const containerClass = `${className} ${
    isEditable ? 'hover:bg-blue-50 rounded transition-colors px-2 py-1' : ''
  }`;

  if (isEditing) {
    return (
      <div className="flex items-center" ref={editableRef}>
        <Input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`mr-2 ${inputClassName}`}
          placeholder={placeholder}
          autoFocus
        />
        <Button
          onClick={handleSave}
          variant="ghost"
          size="icon"
          className={`text-green-600 hover:text-green-700 ${buttonClassName}`}
        >
          <Check size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div onClick={handleStartEditing} className={containerClass}>
      {children || value || placeholder}
    </div>
  );
};
