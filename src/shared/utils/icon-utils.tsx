import {
  MousePointer,
  Smartphone,
  Settings,
  Zap,
  Star,
  Heart,
  Shield,
  Code,
  Coffee,
  Laptop,
} from 'lucide-react';
import React from 'react';

/**
 * Renders an icon based on a string identifier or returns the icon React element directly.
 * @param icon - A string identifier for a predefined icon, or a React element
 * @returns The rendered icon as a React element
 */
export const RenderIcon = ({ icon }: { icon: string }) => {
  // Return icon component based on string identifier
  switch (icon.toLowerCase()) {
    case 'mouse':
    case 'pointer':
      return <MousePointer />;
    case 'smartphone':
    case 'mobile':
      return <Smartphone />;
    case 'settings':
    case 'gear':
      return <Settings />;
    case 'zap':
    case 'lightning':
      return <Zap />;
    case 'star':
      return <Star />;
    case 'heart':
      return <Heart />;
    case 'shield':
      return <Shield />;
    case 'code':
      return <Code />;
    case 'coffee':
      return <Coffee />;
    case 'laptop':
      return <Laptop />;
    default:
      return icon; // Return as is if no match
  }
};
