'use client';

import { GalleryItem } from '@/features/sections/types/section';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableGalleryItem } from './SortableGalleryItem';
import { useGalleryDragAndDrop } from '@/features/builder/hooks/useGalleryDragAndDrop';
import { memo } from 'react';

interface GalleryItemsListProps {
  items: GalleryItem[];
  onItemsChange: (items: GalleryItem[]) => void;
  onRemoveItem: (index: number) => void;
  onChangeItem: (
    index: number,
    field: keyof GalleryItem,
    value: string
  ) => void;
}

export const GalleryItemsList = memo(function GalleryItemsList({
  items,
  onItemsChange,
  onRemoveItem,
  onChangeItem,
}: GalleryItemsListProps) {
  const {
    activeId,
    overIndex,
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useGalleryDragAndDrop(items, onItemsChange);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* Drop indicator before first item */}
        {activeId && (
          <div
            className={`h-1 bg-primary rounded-full my-1 transition-all duration-150 ${
              overIndex === 0
                ? 'opacity-100 scale-y-100'
                : 'opacity-0 scale-y-0'
            }`}
          />
        )}

        {items.map((item, index) => (
          <div key={item.id} className="relative">
            <SortableGalleryItem
              item={item}
              index={index}
              onRemove={onRemoveItem}
              onChange={onChangeItem}
              isDragging={activeId === item.id}
              isOver={overIndex === index}
            />

            {/* Drop indicator after each item */}
            {activeId && (
              <div
                className={`h-1 bg-primary rounded-full my-1 transition-all duration-150 ${
                  overIndex === index + 1
                    ? 'opacity-100 scale-y-100'
                    : 'opacity-0 scale-y-0'
                }`}
              />
            )}
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
});
