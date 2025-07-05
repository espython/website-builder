'use client';

import { PricingPlan } from '@/features/sections/types/section';
import { PricingPlanItem } from './PricingPlanItem';
import { memo } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { SectionFieldValue } from '@/features/builder/hooks/useSectionEditor';

export interface PricingPlansListProps {
  plans: PricingPlan[];
  handlePlanChange: (
    index: number,
    field: keyof PricingPlan,
    value: SectionFieldValue
  ) => void;
  addFeature: (planIndex: number) => void;
  removeFeature: (planIndex: number, featureIndex: number) => void;
  updateFeature: (
    planIndex: number,
    featureIndex: number,
    value: string
  ) => void;
  removePlan: (index: number) => void;
  toggleFeatured: (index: number) => void;
  addPlan: () => void;
  newFeature: string;
  setNewFeature: (value: string) => void;
}

export const PricingPlansList = memo(function PricingPlansList({
  plans,
  handlePlanChange,
  addFeature,
  removeFeature,
  updateFeature,
  removePlan,
  toggleFeatured,
  addPlan,
  newFeature,
  setNewFeature,
}: PricingPlansListProps) {
  if (!plans.length) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
        <div className="flex flex-col items-center">
          <p className="text-gray-500 mb-3">No pricing plans added yet</p>
          <Button onClick={addPlan} size="sm">
            <Plus size={16} className="mr-1" />
            Add First Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1  gap-4">
        {plans.map((plan, planIndex) => (
          <PricingPlanItem
            key={plan.id}
            plan={plan}
            planIndex={planIndex}
            handlePlanChange={handlePlanChange}
            addFeature={addFeature}
            removeFeature={removeFeature}
            updateFeature={updateFeature}
            removePlan={removePlan}
            toggleFeatured={toggleFeatured}
            newFeature={newFeature}
            setNewFeature={setNewFeature}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={addPlan} variant="outline">
          <Plus size={16} className="mr-2" />
          Add Another Plan
        </Button>
      </div>
    </div>
  );
});
