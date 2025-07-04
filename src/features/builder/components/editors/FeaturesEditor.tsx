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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={content?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={content?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-700 text-sm">Features</h4>

          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
              >
                <div>
                  <div className="font-medium">{feature.title}</div>
                  {feature.description && (
                    <div className="text-sm text-gray-500">
                      {feature.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditFeature(feature)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Edit feature"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteFeature(feature.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete feature"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}

            {features.length === 0 && (
              <p className="text-gray-500 text-sm">No features added yet.</p>
            )}
          </div>
        </div>

        {/* Feature editing */}
        {editingFeature && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-800">Edit Feature</h4>
              <button
                onClick={() => setEditingFeature(null)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingFeature.title || ''}
                  onChange={(e) =>
                    handleEditingFeatureChange('title', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingFeature.description || ''}
                  onChange={(e) =>
                    handleEditingFeatureChange('description', e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (optional)
                </label>
                <input
                  type="text"
                  value={editingFeature.icon || ''}
                  onChange={(e) =>
                    handleEditingFeatureChange('icon', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Icon name or URL"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleUpdateFeature}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Feature
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add new feature */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">
            Add New Feature
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newFeature.title || ''}
                onChange={(e) =>
                  handleNewFeatureChange('title', e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Feature title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newFeature.description || ''}
                onChange={(e) =>
                  handleNewFeatureChange('description', e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Feature description"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (optional)
              </label>
              <input
                type="text"
                value={newFeature.icon || ''}
                onChange={(e) => handleNewFeatureChange('icon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Icon name or URL"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleAddFeature}
                disabled={!newFeature.title}
                className={`flex items-center px-4 py-2 rounded-md 
                  ${
                    newFeature.title
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <Plus size={16} className="mr-1" />
                Add Feature
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-gray-200 mt-4">
        <button
          onClick={saveAndClose}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default FeaturesEditor;
