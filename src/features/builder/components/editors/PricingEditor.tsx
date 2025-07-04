'use client';

import { useState } from 'react';
import {
  Section,
  PricingContent,
  PricingPlan,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash, Plus, Check, Star } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  SectionFieldValue,
  useSectionEditor,
} from '@/features/builder/hooks/useSectionEditor';

interface PricingEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const PricingEditor = ({ section, updateSection }: PricingEditorProps) => {
  // Use the standardized section editor hook for consistent behavior
  const { content, handleChange, saveAndClose, isSaved } =
    useSectionEditor<PricingContent>(section, updateSection);

  // Ensure plans array always exists to prevent undefined errors
  const plans = content?.plans || [];
  const [newFeature, setNewFeature] = useState('');

  // Handle plan changes
  const handlePlanChange = (
    index: number,
    field: keyof PricingPlan,
    value: SectionFieldValue
  ) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    handleChange('plans', updatedPlans);
  };

  // Add new pricing plan
  const addPlan = () => {
    const newPlan: PricingPlan = {
      id: uuidv4(),
      name: 'New Plan',
      price: '$0',
      interval: 'month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      buttonText: 'Get Started',
      buttonLink: '#',
      isHighlighted: false,
      featured: false,
      description: 'Plan description',
    };
    const updatedPlans = [...plans, newPlan];
    handleChange('plans', updatedPlans);
  };

  // Remove pricing plan
  const removePlan = (index: number) => {
    const updatedPlans = [...plans];
    updatedPlans.splice(index, 1);
    handleChange('plans', updatedPlans);
  };

  // Add feature to a plan
  const addFeature = (planIndex: number) => {
    if (!newFeature.trim()) return;

    const updatedPlans = [...plans];
    const updatedFeatures = [
      ...(updatedPlans[planIndex].features || []),
      newFeature,
    ];
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: updatedFeatures,
    };
    handleChange('plans', updatedPlans);
    setNewFeature('');
  };

  // Remove feature from a plan
  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...plans];
    const updatedFeatures = [...(updatedPlans[planIndex].features || [])];
    updatedFeatures.splice(featureIndex, 1);
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: updatedFeatures,
    };
    handleChange('plans', updatedPlans);
  };

  // Update feature text
  const updateFeature = (
    planIndex: number,
    featureIndex: number,
    value: string
  ) => {
    const updatedPlans = [...plans];
    const updatedFeatures = [...(updatedPlans[planIndex].features || [])];
    updatedFeatures[featureIndex] = value;
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: updatedFeatures,
    };
    handleChange('plans', updatedPlans);
  };

  // Toggle highlight status
  // const toggleHighlight = (index: number) => {
  //   const updatedPlans = [...plans];
  //   updatedPlans[index] = {
  //     ...updatedPlans[index],
  //     isHighlighted: !updatedPlans[index].isHighlighted,
  //   };
  //   handleChange('plans', updatedPlans);
  // };

  // Toggle featured status
  const toggleFeatured = (index: number) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      featured: !updatedPlans[index].featured,
    };
    handleChange('plans', updatedPlans);
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Pricing Content
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
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-700">Pricing Plans</h4>
            <button
              onClick={addPlan}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              <Plus size={14} className="inline mr-1" />
              Add Plan
            </button>
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Plus size={24} className="text-gray-500" />
                </div>
                <h4 className="text-gray-700 font-medium mb-1">
                  No pricing plans yet
                </h4>
                <p className="text-gray-500 text-sm mb-3">
                  Add your first pricing plan to get started.
                </p>
                <button
                  onClick={addPlan}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add First Plan
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {plans.map((plan, planIndex) => (
                <div
                  key={plan.id || planIndex}
                  className={`p-4 border rounded-md ${
                    plan.featured
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={plan.name || ''}
                          onChange={(e) =>
                            handlePlanChange(planIndex, 'name', e.target.value)
                          }
                          className="font-medium text-lg border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-0.5 rounded"
                          placeholder="Plan Name"
                        />
                        {plan.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={plan.price || ''}
                        onChange={(e) =>
                          handlePlanChange(planIndex, 'price', e.target.value)
                        }
                        className="text-xl font-bold border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-0.5 rounded"
                        placeholder="$99"
                      />
                      <input
                        type="text"
                        value={plan.interval || ''}
                        onChange={(e) =>
                          handlePlanChange(
                            planIndex,
                            'interval',
                            e.target.value
                          )
                        }
                        className="text-gray-500 text-sm border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-0.5 rounded"
                        placeholder="per month"
                      />
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => toggleFeatured(planIndex)}
                        title={
                          plan.featured ? 'Remove featured' : 'Make featured'
                        }
                        className={`p-1 rounded-md ${
                          plan.featured
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <Star
                          size={16}
                          className={plan.featured ? 'fill-blue-500' : ''}
                        />
                      </button>
                      <button
                        onClick={() => removePlan(planIndex)}
                        title="Delete plan"
                        className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={plan.description || ''}
                    onChange={(e) =>
                      handlePlanChange(planIndex, 'description', e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-3 text-sm"
                    placeholder="Plan description"
                  ></textarea>

                  <div className="mb-3">
                    <h5 className="font-medium text-sm mb-2">Features</h5>
                    <ul className="space-y-2">
                      {(plan.features || []).map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <div className="flex-shrink-0 text-green-600">
                            <Check size={16} />
                          </div>
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              updateFeature(
                                planIndex,
                                featureIndex,
                                e.target.value
                              )
                            }
                            className="flex-1 text-sm border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-0.5 rounded"
                          />
                          <button
                            onClick={() =>
                              removeFeature(planIndex, featureIndex)
                            }
                            className="p-1 text-red-500 hover:bg-red-50 rounded-md"
                            title="Remove feature"
                          >
                            <Trash size={14} />
                          </button>
                        </li>
                      ))}
                      {(!plan.features || plan.features.length === 0) && (
                        <li className="text-gray-500 text-sm">
                          No features added yet
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="New feature..."
                    />
                    <button
                      onClick={() => addFeature(planIndex)}
                      disabled={!newFeature.trim()}
                      className={`ml-2 px-3 py-1.5 rounded-md text-white text-sm ${
                        newFeature.trim()
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-4">
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

export default PricingEditor;
