'use client';

import { useState } from 'react';
import {
  Section,
  FeaturesContent,
  FeatureItem,
  SectionContent,
} from '@/features/sections/types/section';
import { Plus, X, Edit2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

// Import DnD kit
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
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FeaturesEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

// Sortable feature item component
interface SortableFeatureItemProps {
  feature: FeatureItem;
  onDelete: (id: string) => void;
  onEdit: (feature: FeatureItem) => void;
  isDraggingOver: boolean;
}

const SortableFeatureItem = ({
  feature,
  onDelete,
  onEdit,
}: SortableFeatureItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feature.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`mb-2 ${isDragging ? 'shadow-lg ring-2 ring-primary/20' : 'hover:shadow-md'} transition-shadow duration-200`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div
            className={`cursor-grab p-1 rounded-md ${isDragging ? 'bg-gray-100' : 'hover:bg-gray-100'} transition-colors duration-200 flex items-center`}
            {...attributes}
            {...listeners}
          >
            <GripVertical
              size={16}
              className={`${isDragging ? 'text-primary' : 'text-gray-400'} transition-colors duration-200`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{feature.title}</h3>
            <p className="text-sm text-gray-500 truncate">
              {feature.description}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => onEdit(feature)}
              size="sm"
              variant="ghost"
              className="p-1 h-auto transition-colors duration-200"
            >
              <Edit2 size={14} className="text-gray-500" />
            </Button>
            <Button
              onClick={() => onDelete(feature.id)}
              size="sm"
              variant="ghost"
              className="p-1 h-auto text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturesEditor = ({ section, updateSection }: FeaturesEditorProps) => {
  // Use the standardized section editor hook
  const { content, setContent, handleChange } =
    useSectionEditor<FeaturesContent>(section, updateSection);

  const [editingFeature, setEditingFeature] = useState<FeatureItem | null>(
    null
  );
  const [newFeature, setNewFeature] = useState<Partial<FeatureItem>>({
    title: '',
    description: '',
    icon: '',
  });

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

  // Handle drag end for feature reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = features.findIndex((item) => item.id === active.id);
      const newIndex = features.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(features, oldIndex, newIndex);
      setContent({ ...content, items: newItems });
    }
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const overItemId = event.over.id.toString();
      const overItemIndex = features.findIndex(
        (item) => item.id === overItemId
      );
      setOverIndex(overItemIndex);
    } else {
      setOverIndex(null);
    }
  };

  // Ensure features array always exists
  const features = content?.items || [];

  // Add new feature
  const handleAddFeature = () => {
    if (!newFeature.title) return; // Require at least a title

    const feature: FeatureItem = {
      id: uuidv4(),
      title: newFeature.title || '',
      description: newFeature.description || '',
      icon: newFeature.icon || '',
    };

    const updatedFeatures = [...features, feature];
    setContent({ ...content, items: updatedFeatures });

    // Reset form
    setNewFeature({
      title: '',
      description: '',
      icon: '',
    });
  };

  // Delete feature
  const handleDeleteFeature = (id: string) => {
    const updatedFeatures = features.filter((feature) => feature.id !== id);
    setContent({ ...content, items: updatedFeatures });

    if (editingFeature && editingFeature.id === id) {
      setEditingFeature(null);
    }
  };

  // Start editing a feature
  const handleEditFeature = (feature: FeatureItem) => {
    setEditingFeature(feature);
  };

  // Update edited feature
  const handleUpdateFeature = () => {
    if (!editingFeature) return;

    const updatedFeatures = features.map((feature) =>
      feature.id === editingFeature.id ? editingFeature : feature
    );

    setContent({ ...content, items: updatedFeatures });
    setEditingFeature(null);
  };

  // Handle change in edited feature
  const handleEditingFeatureChange = (
    field: keyof FeatureItem,
    value: string
  ) => {
    if (!editingFeature) return;

    setEditingFeature({
      ...editingFeature,
      [field]: value,
    });
  };

  // Handle change in new feature form
  const handleNewFeatureChange = (field: keyof FeatureItem, value: string) => {
    setNewFeature({
      ...newFeature,
      [field]: value,
    });
  };

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // The feature item rendering with drop indicators
  const renderFeaturesList = () => {
    return (
      <>
        {features.map((feature, index) => (
          <div key={feature.id} className="relative">
            {/* Drop indicator above the first item */}
            {index === 0 && activeId && activeId !== feature.id && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-primary rounded-full z-10 animate-pulse" />
            )}

            <SortableFeatureItem
              feature={feature}
              onDelete={handleDeleteFeature}
              onEdit={handleEditFeature}
              isDraggingOver={index === overIndex && activeId !== feature.id}
            />

            {/* Drop indicator below each item */}
            {activeId && activeId !== feature.id && (
              <div
                className={`h-1 bg-primary rounded-full my-1 z-10 transition-opacity duration-200 ${index === overIndex ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Features Content
        </h3>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={content?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
          />
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-700 text-sm mb-3">Features</h4>

          <div className="space-y-1">
            {features.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={features.map((f) => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {renderFeaturesList()}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
                <p className="text-sm text-gray-500">
                  No features yet. Add one below.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feature editing */}
        {editingFeature && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-800">Edit Feature</h4>
                <Button
                  onClick={() => setEditingFeature(null)}
                  variant="ghost"
                  size="sm"
                  className="p-1 text-gray-500 hover:text-gray-700 h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    type="text"
                    value={editingFeature.title || ''}
                    onChange={(e) =>
                      handleEditingFeatureChange('title', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingFeature.description || ''}
                    onChange={(e) =>
                      handleEditingFeatureChange('description', e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-icon">Icon (optional)</Label>
                  <Input
                    id="edit-icon"
                    type="text"
                    value={editingFeature.icon || ''}
                    onChange={(e) =>
                      handleEditingFeatureChange('icon', e.target.value)
                    }
                    placeholder="Icon name or URL"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button onClick={handleUpdateFeature}>Update Feature</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add new feature */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">
            Add New Feature
          </h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="new-title">Title</Label>
              <Input
                id="new-title"
                type="text"
                value={newFeature.title || ''}
                onChange={(e) =>
                  handleNewFeatureChange('title', e.target.value)
                }
                placeholder="Feature title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newFeature.description || ''}
                onChange={(e) =>
                  handleNewFeatureChange('description', e.target.value)
                }
                rows={2}
                placeholder="Feature description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-icon">Icon (optional)</Label>
              <Input
                id="new-icon"
                type="text"
                value={newFeature.icon || ''}
                onChange={(e) => handleNewFeatureChange('icon', e.target.value)}
                placeholder="Icon name or URL"
              />
            </div>

            <div className="pt-2">
              <Button
                onClick={handleAddFeature}
                disabled={!newFeature.title}
                className={!newFeature.title ? 'bg-gray-200 text-gray-500' : ''}
                variant={newFeature.title ? 'default' : 'outline'}
              >
                <Plus size={16} className="mr-1" />
                Add Feature
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesEditor;
