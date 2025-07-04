'use client';

import { useState } from 'react';
import {
  Section,
  FeaturesContent,
  FeatureItem,
  SectionContent,
} from '@/features/sections/types/section';
import { Plus, X, Edit2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface FeaturesEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const FeaturesEditor = ({ section, updateSection }: FeaturesEditorProps) => {
  // Use the standardized section editor hook
  const { content, setContent, handleChange, saveAndClose, isSaved } =
    useSectionEditor<FeaturesContent>(section, updateSection);

  const [editingFeature, setEditingFeature] = useState<FeatureItem | null>(
    null
  );
  const [newFeature, setNewFeature] = useState<Partial<FeatureItem>>({
    title: '',
    description: '',
    icon: '',
  });

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

          <div className="space-y-3">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    {feature.description && (
                      <div className="text-sm text-gray-500">
                        {feature.description}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleEditFeature(feature)}
                      variant="ghost"
                      size="sm"
                      className="p-1 text-blue-600 hover:text-blue-800 h-8 w-8"
                      title="Edit feature"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteFeature(feature.id)}
                      variant="ghost"
                      size="sm"
                      className="p-1 text-red-600 hover:text-red-800 h-8 w-8"
                      title="Delete feature"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {features.length === 0 && (
              <p className="text-gray-500 text-sm">No features added yet.</p>
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

      {/* Save Button */}
      <div className="pt-4 border-t border-gray-200 mt-4">
        <Button
          onClick={saveAndClose}
          variant={isSaved ? 'outline' : 'default'}
          className={
            isSaved ? 'bg-green-600 text-white hover:bg-green-700' : ''
          }
        >
          {isSaved ? 'Saved ✓' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default FeaturesEditor;
