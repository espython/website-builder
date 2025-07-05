'use client';

import {
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { usePreviewArea } from '../hooks/usePreviewArea';
import PreviewToolbar from './PreviewToolbar';
import DeviceFrame from './DeviceFrame';
import EmptyPreviewState from './EmptyPreviewState';
import SectionRenderer from './SectionRenderer';
import SortableSection from './SortableSection';

const PreviewArea = () => {
  const {
    sections,
    selectedSectionId,
    previewMode,
    handleDragEnd,
    handleSectionSelect,
    getPreviewContainerClass,
    handlePreviewModeChange,
  } = usePreviewArea();

  // Configure drag sensors with higher activation constraints for better user experience
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8, // 8px movement required before drag starts
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200, // 200ms delay before drag starts
      tolerance: 5, // 5px movement allowed before cancelling
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className="flex flex-col h-full">
      {/* Preview toolbar */}
      <PreviewToolbar
        previewMode={previewMode}
        onModeChange={handlePreviewModeChange}
      />

      {/* Preview content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div
          className={`bg-white transition-all duration-300 ${getPreviewContainerClass()}`}
        >
          <DeviceFrame deviceType={previewMode}>
            {sections.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map((section) => section.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="min-h-full flex flex-col">
                    {sections.map((section) => (
                      <SortableSection key={section.id} id={section.id}>
                        <SectionRenderer
                          section={section}
                          isSelected={section.id === selectedSectionId}
                          onClick={() => handleSectionSelect(section.id)}
                          previewMode={previewMode}
                        />
                      </SortableSection>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <EmptyPreviewState />
            )}
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
