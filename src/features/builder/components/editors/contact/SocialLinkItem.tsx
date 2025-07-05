import React, { memo } from 'react';
import { Trash } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { FooterLink } from '@/features/sections/types/section';

interface SocialLinkItemProps {
  link: FooterLink;
  index: number;
  onLinkChange: (index: number, field: keyof FooterLink, value: string) => void;
  onRemoveLink: (index: number) => void;
}

const SocialLinkItem = memo(
  ({ link, index, onLinkChange, onRemoveLink }: SocialLinkItemProps) => {
    return (
      <div className="flex mb-3 items-center">
        <div className="flex-1 mr-2">
          <Input
            type="text"
            value={link.label}
            placeholder="Platform (e.g. Twitter)"
            onChange={(e) => onLinkChange(index, 'label', e.target.value)}
          />
        </div>
        <div className="flex-[2] mr-2">
          <Input
            type="url"
            value={link.link}
            placeholder="URL (e.g. https://twitter.com/yourusername)"
            onChange={(e) => onLinkChange(index, 'link', e.target.value)}
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemoveLink(index)}
          className="p-2 text-gray-400 hover:text-red-500"
          aria-label="Remove social link"
        >
          <Trash size={16} />
        </Button>
      </div>
    );
  }
);

SocialLinkItem.displayName = 'SocialLinkItem';

export default SocialLinkItem;
