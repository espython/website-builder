'use client';

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PricingPlan } from '@/features/sections/types/section';

interface UsePricingPlansProps {
  plans: PricingPlan[];
  onPlansChange: (plans: PricingPlan[]) => void;
}

export const usePricingPlans = ({
  plans,
  onPlansChange,
}: UsePricingPlansProps) => {
  const [newFeature, setNewFeature] = useState('');

  // Handle plan changes
  const handlePlanChange = useCallback(
    (index: number, field: keyof PricingPlan, value: string) => {
      const updatedPlans = [...plans];
      updatedPlans[index] = { ...updatedPlans[index], [field]: value };
      onPlansChange(updatedPlans);
    },
    [plans, onPlansChange]
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
    onPlansChange(updatedPlans);
  }, [plans, onPlansChange]);

  // Remove pricing plan
  const removePlan = useCallback(
    (index: number) => {
      const updatedPlans = [...plans];
      updatedPlans.splice(index, 1);
      onPlansChange(updatedPlans);
    },
    [plans, onPlansChange]
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
      onPlansChange(updatedPlans);
      setNewFeature('');
    },
    [newFeature, plans, onPlansChange]
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
      onPlansChange(updatedPlans);
    },
    [plans, onPlansChange]
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
      onPlansChange(updatedPlans);
    },
    [plans, onPlansChange]
  );

  // Toggle featured status
  const toggleFeatured = useCallback(
    (index: number) => {
      const updatedPlans = [...plans];
      updatedPlans[index] = {
        ...updatedPlans[index],
        featured: !updatedPlans[index].featured,
      };
      onPlansChange(updatedPlans);
    },
    [plans, onPlansChange]
  );

  return {
    newFeature,
    setNewFeature,
    handlePlanChange,
    addPlan,
    removePlan,
    addFeature,
    removeFeature,
    updateFeature,
    toggleFeatured,
  };
};
