import { useState } from 'react';
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { FeatureItem } from '@/features/sections/types/section';

export function useFeaturesDragAndDrop(
  features: FeatureItem[],
  onFeaturesChange: (features: FeatureItem[]) => void
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Configure sensors for drag and drop
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px movement required before drag starts
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150, // 150ms delay before drag starts
      tolerance: 5, // 5px movement allowed before cancelling
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = features.findIndex(
      (feature) => feature.id === active.id
    );
    const overIndex = features.findIndex((feature) => feature.id === over.id);

    if (activeIndex !== overIndex) {
      setOverIndex(overIndex);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = features.findIndex(
        (feature) => feature.id === active.id
      );
      const overIndex = features.findIndex((feature) => feature.id === over.id);

      // Update the features order
      const newFeatures = arrayMove(features, activeIndex, overIndex);
      onFeaturesChange(newFeatures);
    }

    // Reset states
    setActiveId(null);
    setOverIndex(null);
  };

  return {
    activeId,
    overIndex,
    sensors,
    collisionDetection: closestCenter,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
