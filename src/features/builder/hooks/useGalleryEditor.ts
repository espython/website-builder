import { useCallback, useState } from 'react';
import { GalleryContent, GalleryItem } from '@/features/sections/types/section';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';
import { v4 as uuidv4 } from 'uuid';

interface UseGalleryEditorProps {
  content: GalleryContent;
  onContentChange: (
    field: keyof GalleryContent,
    value: SectionFieldValue
  ) => void;
}

export const useGalleryEditor = ({
  content,
  onContentChange,
}: UseGalleryEditorProps) => {
  // Initialize a new gallery item state
  const [newItem, setNewItem] = useState<GalleryItem>({
    id: uuidv4(),
    image: '',
    link: '',
    caption: '',
  });

  // Handle header field changes
  const handleHeaderChange = useCallback(
    (field: 'title' | 'description', value: string) => {
      onContentChange(field, value);
    },
    [onContentChange]
  );

  // Handle gallery items changes
  const handleItemsChange = useCallback(
    (items: GalleryItem[]) => {
      onContentChange('items', items);
    },
    [onContentChange]
  );

  // Handle individual item field change
  const handleItemChange = useCallback(
    (index: number, field: keyof GalleryItem, value: string) => {
      const updatedItems = [...(content.items || [])];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      onContentChange('items', updatedItems);
    },
    [content.items, onContentChange]
  );

  // Add a new gallery item
  const handleAddItem = useCallback(() => {
    const newGalleryItem: GalleryItem = {
      id: uuidv4(),
      image: '',
      link: '',
      caption: '',
    };

    const updatedItems = [...(content.items || []), newGalleryItem];
    onContentChange('items', updatedItems);

    // Reset the new item form
    setNewItem({
      id: uuidv4(),
      image: '',
      link: '',
      caption: '',
    });
  }, [content.items, onContentChange]);

  // Remove a gallery item
  const handleRemoveItem = useCallback(
    (index: number) => {
      const updatedItems = (content.items || []).filter((_, i) => i !== index);
      onContentChange('items', updatedItems);
    },
    [content.items, onContentChange]
  );

  return {
    // State
    title: content?.title || '',
    description: content?.description || '',
    items: content?.items || [],
    newItem,

    // Handlers
    handleHeaderChange,
    handleItemsChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    setNewItem,
  };
};
