'use client';

import { PricingPlan } from '@/features/sections/types/section';
import { Check, Star, Trash } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

export interface PricingPlanItemProps {
  plan: PricingPlan;
  planIndex: number;
  handlePlanChange: (
    index: number,
    field: keyof PricingPlan,
    value: string
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
  newFeature: string;
  setNewFeature: (value: string) => void;
}

export const PricingPlanItem = memo(function PricingPlanItem({
  plan,
  planIndex,
  handlePlanChange,
  addFeature,
  removeFeature,
  updateFeature,
  removePlan,
  toggleFeatured,
  newFeature,
  setNewFeature,
}: PricingPlanItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            value={plan.name}
            onChange={(e) =>
              handlePlanChange(planIndex, 'name', e.target.value)
            }
            className="font-bold text-lg border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            placeholder="Plan name"
          />
          <div className="flex space-x-1">
            <button
              onClick={() => toggleFeatured(planIndex)}
              title={plan.featured ? 'Unmark as featured' : 'Mark as featured'}
              className={`p-1 rounded-md ${
                plan.featured
                  ? 'text-yellow-500 bg-yellow-50'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Star size={16} />
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

        <div className="flex items-baseline space-x-1 mb-3">
          <input
            type="text"
            value={plan.price}
            onChange={(e) =>
              handlePlanChange(planIndex, 'price', e.target.value)
            }
            className="font-bold text-2xl border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="$0"
          />
          <span className="text-gray-500">/</span>
          <input
            type="text"
            value={plan.interval}
            onChange={(e) =>
              handlePlanChange(planIndex, 'interval', e.target.value)
            }
            className="text-gray-500 border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="month"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-3">
          <input
            type="text"
            value={plan.buttonText}
            onChange={(e) =>
              handlePlanChange(planIndex, 'buttonText', e.target.value)
            }
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Button text"
          />
          <input
            type="text"
            value={plan.buttonLink}
            onChange={(e) =>
              handlePlanChange(planIndex, 'buttonLink', e.target.value)
            }
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Button URL"
          />
        </div>

        <Textarea
          value={plan.description || ''}
          onChange={(e) =>
            handlePlanChange(planIndex, 'description', e.target.value)
          }
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-3 text-sm"
          placeholder="Plan description"
        />

        <div className="mb-3">
          <h5 className="font-medium text-sm mb-2">Features</h5>
          <ul className="space-y-2">
            {(plan.features || []).map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center space-x-2">
                <div className="flex-shrink-0 text-green-600">
                  <Check size={16} />
                </div>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    updateFeature(planIndex, featureIndex, e.target.value)
                  }
                  className="flex-1 text-sm border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-0.5 rounded"
                />
                <button
                  onClick={() => removeFeature(planIndex, featureIndex)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-md"
                  title="Remove feature"
                >
                  <Trash size={14} />
                </button>
              </li>
            ))}
            {(!plan.features || plan.features.length === 0) && (
              <li className="text-gray-500 text-sm">No features added yet</li>
            )}
          </ul>
        </div>

        <div className="flex items-center">
          <Input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1"
            placeholder="New feature..."
          />
          <Button
            onClick={() => addFeature(planIndex)}
            disabled={!newFeature.trim()}
            className="ml-2"
            variant={newFeature.trim() ? 'default' : 'secondary'}
            size="sm"
          >
            <Check size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
});
