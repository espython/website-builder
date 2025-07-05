import React, { memo } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { FooterLink } from '@/features/sections/types/section';
import SocialLinkItem from './SocialLinkItem';
import { Plus } from 'lucide-react';

interface SocialLinksListProps {
  socialLinks: FooterLink[];
  handleSocialLinkChange: (
    index: number,
    field: keyof FooterLink,
    value: string
  ) => void;
  addSocialLink: () => void;
  removeSocialLink: (index: number) => void;
}

const SocialLinksList = memo(
  ({
    socialLinks,
    handleSocialLinkChange,
    addSocialLink,
    removeSocialLink,
  }: SocialLinksListProps) => {
    return (
      <div className="pt-4 border-t border-gray-200">
        <Label className="block mb-2">Social Links</Label>

        {socialLinks.map((link, index) => (
          <SocialLinkItem
            key={index}
            link={link}
            index={index}
            onLinkChange={handleSocialLinkChange}
            onRemoveLink={removeSocialLink}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSocialLink}
          className="mt-2"
        >
          <Plus size={16} className="mr-1" /> Add Social Link
        </Button>
      </div>
    );
  }
);

SocialLinksList.displayName = 'SocialLinksList';

export default SocialLinksList;
