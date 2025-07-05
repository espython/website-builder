import { useCallback, useState } from 'react';
import {
  FeaturesContent,
  FeatureItem,
} from '@/features/sections/types/section';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';

interface UseFeaturesEditorProps {
  content: FeaturesContent;
  onContentChange: (
    field: keyof FeaturesContent,
    value: SectionFieldValue
  ) => void;
}

export const useFeaturesEditor = ({
  content,
  onContentChange,
}: UseFeaturesEditorProps) => {
  // Track active feature being dragged
  const [activeId, setActiveId] = useState<string | null>(null);
  // Track if we're dragging over another element
  const [overId, setOverId] = useState<string | null>(null);

  // State for editing a feature
  const [editingFeature, setEditingFeature] = useState<FeatureItem | null>(
    null
  );

  // State for new feature being added
  const [newFeature, setNewFeature] = useState<Partial<FeatureItem>>({
    title: '',
    description: '',
    icon: '',
  });

  // Handle drag start
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      setOverId(over.id as string);
    } else {
      setOverId(null);
    }
  }, []);

  // Handle drag end for feature reordering
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveId(null);
      setOverId(null);

      if (over && active.id !== over.id) {
        const features = [...(content.items || [])];
        const activeIndex = features.findIndex((item) => item.id === active.id);
        const overIndex = features.findIndex((item) => item.id === over.id);

        const newFeatures = arrayMove(features, activeIndex, overIndex);
        onContentChange('items', newFeatures);
      }
    },
    [content.items, onContentChange]
  );

  // Add new feature
  const handleAddFeature = useCallback(() => {
    if (!newFeature.title) return;

    const feature: FeatureItem = {
      id: uuidv4(),
      title: newFeature.title || '',
      description: newFeature.description || '',
      icon: newFeature.icon || '',
    };

    const updatedFeatures = [...(content.items || []), feature];
    onContentChange('items', updatedFeatures);

    // Reset new feature form
    setNewFeature({
      title: '',
      description: '',
      icon: '',
    });
  }, [content.items, newFeature, onContentChange]);

  // Delete feature
  const handleDeleteFeature = useCallback(
    (id: string) => {
      const updatedFeatures = (content.items || []).filter((f) => f.id !== id);
      onContentChange('items', updatedFeatures);
    },
    [content.items, onContentChange]
  );

  // Start editing a feature
  const handleEditFeature = useCallback((feature: FeatureItem) => {
    setEditingFeature({ ...feature });
  }, []);

  // Update edited feature
  const handleUpdateFeature = useCallback(() => {
    if (!editingFeature) return;

    const updatedFeatures = (content.items || []).map((f) =>
      f.id === editingFeature.id ? editingFeature : f
    );

    onContentChange('items', updatedFeatures);
    setEditingFeature(null);
  }, [editingFeature, content.items, onContentChange]);

  // Handle change in edited feature
  const handleEditingFeatureChange = useCallback(
    (field: keyof FeatureItem, value: string) => {
      if (!editingFeature) return;

      setEditingFeature({
        ...editingFeature,
        [field]: value,
      });
    },
    [editingFeature]
  );

  // Handle change in new feature form
  const handleNewFeatureChange = useCallback(
    (field: keyof FeatureItem, value: string) => {
      setNewFeature({
        ...newFeature,
        [field]: value,
      });
    },
    [newFeature]
  );

  // Handle header related changes
  const handleHeaderChange = useCallback(
    (field: 'title' | 'description', value: string) => {
      onContentChange(field, value);
    },
    [onContentChange]
  );

  return {
    features: content.items || [],
    title: content.title || '',
    description: content.description || '',
    activeId,
    overId,
    editingFeature,
    newFeature,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddFeature,
    handleDeleteFeature,
    handleEditFeature,
    handleUpdateFeature,
    handleEditingFeatureChange,
    handleNewFeatureChange,
    handleHeaderChange,
    setEditingFeature,
  };
};
