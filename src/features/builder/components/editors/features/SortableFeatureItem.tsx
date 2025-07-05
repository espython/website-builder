import React, { memo } from 'react';
import { FeatureItem } from '@/features/sections/types/section';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Edit2, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableFeatureItemProps {
  feature: FeatureItem;
  onDelete: (id: string) => void;
  onEdit: (feature: FeatureItem) => void;
  isDraggingOver?: boolean;
}

const SortableFeatureItem = memo(
  ({ feature, onDelete, onEdit, isDraggingOver }: SortableFeatureItemProps) => {
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
        className={`mb-2 ${isDragging ? 'shadow-lg ring-2 ring-primary/20' : 'hover:shadow-md'} 
        ${isDraggingOver ? 'border-dashed border-2 border-primary/40' : ''} 
        transition-shadow duration-200`}
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
  }
);

SortableFeatureItem.displayName = 'SortableFeatureItem';

export default SortableFeatureItem;
