import React, { memo } from 'react';
import { FeatureItem } from '@/features/sections/types/section';
import SortableFeatureItem from './SortableFeatureItem';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface FeaturesListProps {
  features: FeatureItem[];
  activeId: string | null;
  overId: string | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDelete: (id: string) => void;
  onEdit: (feature: FeatureItem) => void;
}

const FeaturesList = memo(
  ({
    features,
    overId,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDelete,
    onEdit,
  }: FeaturesListProps) => {
    // Configure sensors for drag and drop
    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts
      },
    });

    const touchSensor = useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms delay before drag starts
        tolerance: 5, // 5px movement tolerance
      },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    // If no features, show empty state
    if (!features.length) {
      return (
        <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
          <p className="text-gray-500">No features added yet.</p>
          <p className="text-sm text-gray-400">Add your first feature below.</p>
        </div>
      );
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={features.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {features.map((feature) => (
              <SortableFeatureItem
                key={feature.id}
                feature={feature}
                onDelete={onDelete}
                onEdit={onEdit}
                isDraggingOver={overId === feature.id}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }
);

FeaturesList.displayName = 'FeaturesList';

export default FeaturesList;
