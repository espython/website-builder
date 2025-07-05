'use client';

import { useState, useCallback } from 'react';
import {
  Section,
  PricingContent,
  PricingPlan,
} from '@/features/sections/types/section';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  SectionFieldValue,
  useSectionEditor,
} from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { PricingPlansList } from './pricing/PricingPlansList';
import { BaseEditorProps } from './types';

interface PricingEditorProps extends BaseEditorProps {
  section: Section;
}

const PricingEditor = ({ section, updateSection }: PricingEditorProps) => {
  // Use the standardized section editor hook for consistent behavior
  const { content, handleChange } = useSectionEditor<PricingContent>(
    section,
    updateSection
  );

  // Ensure plans array always exists to prevent undefined errors
  const plans = content?.plans || [];
  const [newFeature, setNewFeature] = useState('');

  // Handle plan changes
  const handlePlanChange = useCallback(
    (index: number, field: keyof PricingPlan, value: SectionFieldValue) => {
      const updatedPlans = [...plans];
      updatedPlans[index] = { ...updatedPlans[index], [field]: value };
      handleChange('plans', updatedPlans);
    },
    [plans, handleChange]
  );

  // Add new pricing plan
  const addPlan = useCallback(() => {
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
  }, [plans, handleChange]);

  // Remove pricing plan
  const removePlan = useCallback(
    (index: number) => {
      const updatedPlans = [...plans];
      updatedPlans.splice(index, 1);
      handleChange('plans', updatedPlans);
    },
    [plans, handleChange]
  );

  // Add feature to a plan
  const addFeature = useCallback(
    (planIndex: number) => {
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
    },
    [newFeature, plans, handleChange]
  );

  // Remove feature from a plan
  const removeFeature = useCallback(
    (planIndex: number, featureIndex: number) => {
      const updatedPlans = [...plans];
      const updatedFeatures = [...(updatedPlans[planIndex].features || [])];
      updatedFeatures.splice(featureIndex, 1);
      updatedPlans[planIndex] = {
        ...updatedPlans[planIndex],
        features: updatedFeatures,
      };
      handleChange('plans', updatedPlans);
    },
    [plans, handleChange]
  );

  // Update feature text
  const updateFeature = useCallback(
    (planIndex: number, featureIndex: number, value: string) => {
      const updatedPlans = [...plans];
      const updatedFeatures = [...(updatedPlans[planIndex].features || [])];
      updatedFeatures[featureIndex] = value;
      updatedPlans[planIndex] = {
        ...updatedPlans[planIndex],
        features: updatedFeatures,
      };
      handleChange('plans', updatedPlans);
    },
    [plans, handleChange]
  );

  // Toggle featured status
  const toggleFeatured = useCallback(
    (index: number) => {
      const updatedPlans = [...plans];
      updatedPlans[index] = {
        ...updatedPlans[index],
        featured: !updatedPlans[index].featured,
      };
      handleChange('plans', updatedPlans);
    },
    [plans, handleChange]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Pricing section title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Pricing section description"
            rows={2}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Pricing Plans</h3>
          {plans.length > 0 && (
            <Button onClick={addPlan} size="sm" className="h-8">
              <Plus size={16} className="mr-1" />
              Add Plan
            </Button>
          )}
        </div>

        <PricingPlansList
          plans={plans}
          handlePlanChange={handlePlanChange}
          addFeature={addFeature}
          removeFeature={removeFeature}
          updateFeature={updateFeature}
          removePlan={removePlan}
          toggleFeatured={toggleFeatured}
          addPlan={addPlan}
          newFeature={newFeature}
          setNewFeature={setNewFeature}
        />
      </div>
    </div>
  );
};

export default PricingEditor;
