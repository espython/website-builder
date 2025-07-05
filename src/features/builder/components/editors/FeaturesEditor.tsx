'use client';

import { Section, FeaturesContent } from '@/features/sections/types/section';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Card, CardContent } from '@/shared/components/ui/card';
import { BaseEditorProps } from './types';
import { useFeaturesEditor } from '../../hooks/useFeaturesEditor';
import FeaturesList from './features/FeaturesList';
import FeatureForm from './features/FeatureForm';

interface FeaturesEditorProps extends BaseEditorProps {
  section: Section;
}

const FeaturesEditor = ({ section, updateSection }: FeaturesEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<FeaturesContent>(
    section,
    updateSection
  );

  // Use our features-specific hook for specialized logic
  const {
    features,
    title,
    description,
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
  } = useFeaturesEditor({
    content,
    onContentChange: handleChange,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="section-title">Section Title</Label>
          <Input
            id="section-title"
            value={title}
            onChange={(e) => handleHeaderChange('title', e.target.value)}
            placeholder="Features Section Title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="section-description">Section Description</Label>
          <Textarea
            id="section-description"
            value={description}
            onChange={(e) => handleHeaderChange('description', e.target.value)}
            rows={2}
            placeholder="Features Section Subtitle"
          />
        </div>

        <div className="space-y-2">
          <Label>Features</Label>
          <FeaturesList
            features={features}
            activeId={activeId}
            overId={overId}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDelete={handleDeleteFeature}
            onEdit={handleEditFeature}
          />
        </div>

        {/* Edit Feature Form */}
        {editingFeature && (
          <Card className="border-blue-100 bg-blue-50/30">
            <CardContent className="pt-4">
              <FeatureForm
                feature={editingFeature}
                isEditing={true}
                onSave={handleUpdateFeature}
                onCancel={() => setEditingFeature(null)}
                onChange={handleEditingFeatureChange}
              />
            </CardContent>
          </Card>
        )}

        {/* Add New Feature Form */}
        <div className="border-t border-gray-200 pt-4">
          <FeatureForm
            feature={newFeature}
            isEditing={false}
            onSave={handleAddFeature}
            onChange={handleNewFeatureChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesEditor;
