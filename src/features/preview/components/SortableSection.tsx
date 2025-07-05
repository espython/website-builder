import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableSectionProps {
  id: string;
  children: React.ReactNode;
}

const SortableSection = ({ id, children }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms cubic-bezier(0.25, 1, 0.5, 1)',
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
    touchAction: 'none' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-90' : 'opacity-100'} transition-opacity duration-200`}
    >
      <div
        className={`group relative ${isDragging ? 'ring-2 ring-primary/30 rounded-md' : ''}`}
        {...attributes}
      >
        <div
          className={`${isDragging ? 'scale-[0.99] blur-[0.3px]' : 'scale-100'} transition-all duration-200`}
        >
          {children}
        </div>
        <div
          className={`absolute left-2 top-1/2 -translate-y-1/2 ${isDragging ? 'opacity-100 bg-primary/10' : 'opacity-0 group-hover:opacity-100 bg-white/80'} transition-all duration-200 cursor-grab active:cursor-grabbing p-1.5 rounded-md border border-gray-200 shadow-sm`}
          {...listeners}
        >
          <GripVertical
            size={16}
            className={`${isDragging ? 'text-primary' : 'text-gray-500'} transition-colors duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

export default SortableSection;
