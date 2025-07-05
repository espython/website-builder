'use client';

import { useState, useEffect } from 'react';
import {
  Section,
  FooterContent,
  FooterLinkGroup,
  FooterLink,
  SectionContent,
} from '@/features/sections/types/section';
import { Trash, Plus, GripVertical } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface FooterEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const FooterEditor = ({ section, updateSection }: FooterEditorProps) => {
  const [content, setContent] = useState<FooterContent>(
    section.content as FooterContent
  );

  // Update local state when section changes
  useEffect(() => {
    setContent(section.content as FooterContent);
  }, [section.id, section.content]);

  // Handle input changes for simple fields
  const handleChange = (
    field: keyof FooterContent,
    value:
      | string
      | boolean
      | { text: string; image: string }
      | FooterLink[]
      | FooterLinkGroup[]
  ) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
  };

  // Handle logo changes
  const handleLogoChange = (field: string, value: string) => {
    const updatedLogo = { ...(content.logo || { text: '' }), [field]: value };
    handleChange('logo', updatedLogo as { text: string; image: string });
  };

  // Handle social link changes
  const handleSocialLinkChange = (
    index: number,
    field: keyof FooterLink,
    value: string
  ) => {
    const updatedLinks = [...(content.socialLinks || [])];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('socialLinks', updatedLinks);
  };

  // Add new social link
  const addSocialLink = () => {
    const updatedLinks = [
      ...(content.socialLinks || []),
      { name: '', url: '' },
    ];
    handleChange('socialLinks', updatedLinks as FooterLink[]);
  };

  // Remove social link
  const removeSocialLink = (index: number) => {
    const updatedLinks = [...(content.socialLinks || [])];
    updatedLinks.splice(index, 1);
    handleChange('socialLinks', updatedLinks);
  };

  // Handle link group changes
  const handleLinkGroupChange = (
    index: number,
    field: keyof FooterLinkGroup,
    value: string | boolean | { title: string; links: FooterLink[] }
  ) => {
    const updatedGroups = [...(content.linkGroups || [])];
    updatedGroups[index] = { ...updatedGroups[index], [field]: value };
    handleChange('linkGroups', updatedGroups);
  };

  // Add new link group
  const addLinkGroup = () => {
    const updatedGroups = [
      ...(content.linkGroups || []),
      { title: 'New Group', links: [] },
    ];
    handleChange('linkGroups', updatedGroups as FooterLinkGroup[]);
  };

  // Remove link group
  const removeLinkGroup = (index: number) => {
    const updatedGroups = [...(content.linkGroups || [])];
    updatedGroups.splice(index, 1);
    handleChange('linkGroups', updatedGroups);
  };

  // Handle link changes within a group
  const handleLinkChange = (
    groupIndex: number,
    linkIndex: number,
    field: keyof FooterLink,
    value: string
  ) => {
    const updatedGroups = [...(content.linkGroups || [])];
    const updatedLinks = [...updatedGroups[groupIndex].links];
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], [field]: value };
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      links: updatedLinks,
    };
    handleChange('linkGroups', updatedGroups);
  };

  // Add new link to a group
  const addLink = (groupIndex: number) => {
    const updatedGroups = [...(content.linkGroups || [])];
    const updatedLinks = [
      ...updatedGroups[groupIndex].links,
      { name: '', url: '' },
    ];
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      links: updatedLinks as FooterLink[],
    };
    handleChange('linkGroups', updatedGroups);
  };

  // Remove link from a group
  const removeLink = (groupIndex: number, linkIndex: number) => {
    const updatedGroups = [...(content.linkGroups || [])];
    const updatedLinks = [...updatedGroups[groupIndex].links];
    updatedLinks.splice(linkIndex, 1);
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      links: updatedLinks,
    };
    handleChange('linkGroups', updatedGroups);
  };

  // Debounced auto-save when changes are made
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSection(section.id, content);
    }, 500);

    return () => clearTimeout(timer);
  }, [content, section.id, updateSection]);

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Footer Content
        </h3>

        {/* Logo Section */}
        <Card className="bg-gray-50">
          <CardContent className="p-4 space-y-3">
            <h4 className="font-medium text-gray-700 mb-3">Logo</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="logo-text">Logo Text</Label>
                <Input
                  id="logo-text"
                  type="text"
                  value={content.logo?.text || ''}
                  onChange={(e) => handleLogoChange('text', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-image">Logo Image URL</Label>
                <Input
                  id="logo-image"
                  type="text"
                  value={content.logo?.image || ''}
                  onChange={(e) => handleLogoChange('image', e.target.value)}
                />
                {content.logo?.image && (
                  <div className="mt-2">
                    <img
                      src={content.logo.image}
                      alt="Logo preview"
                      className="h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/120x40?text=Logo';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
          />
        </div>

        {/* Copyright */}
        <div className="space-y-2">
          <Label htmlFor="copyright">Copyright Text</Label>
          <Input
            id="copyright"
            type="text"
            value={
              content.copyright ||
              ` ${new Date().getFullYear()} Your Company. All rights reserved.`
            }
            onChange={(e) => handleChange('copyright', e.target.value)}
          />
        </div>

        {/* Link Groups Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Link Groups</h4>
              <Button
                size="sm"
                variant="default"
                onClick={addLinkGroup}
                className="text-xs h-8"
              >
                <Plus size={14} className="mr-1" />
                Add Group
              </Button>
            </div>

            <div className="space-y-4">
              {(content.linkGroups || []).map((group, groupIndex) => (
                <Card key={groupIndex} className="mb-4">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <GripVertical
                          size={16}
                          className="text-gray-400 mr-2"
                        />
                        <Input
                          value={group.title}
                          onChange={(e) =>
                            handleLinkGroupChange(
                              groupIndex,
                              'title',
                              e.target.value
                            )
                          }
                          className="text-sm h-8"
                          placeholder="Group Title"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLinkGroup(groupIndex)}
                        className="p-1 text-gray-400 hover:text-red-500 h-8 w-8"
                      >
                        <Trash size={14} />
                      </Button>
                    </div>

                    {/* Links in this group */}
                    <div className="space-y-2 pl-6">
                      {group.links.map((link, linkIndex) => (
                        <div
                          key={linkIndex}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={link.label}
                            onChange={(e) =>
                              handleLinkChange(
                                groupIndex,
                                linkIndex,
                                'label',
                                e.target.value
                              )
                            }
                            className="flex-1 text-sm h-8"
                            placeholder="Link Label"
                          />
                          <Input
                            value={link.link}
                            onChange={(e) =>
                              handleLinkChange(
                                groupIndex,
                                linkIndex,
                                'link',
                                e.target.value
                              )
                            }
                            className="flex-1 text-sm h-8"
                            placeholder="URL"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLink(groupIndex, linkIndex)}
                            className="p-1 text-gray-400 hover:text-red-500 h-8 w-8"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => addLink(groupIndex)}
                        className="text-xs px-0 h-6"
                      >
                        <Plus size={14} className="mr-1" />
                        Add Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(content.linkGroups || []).length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  No link groups added. Click &quot;Add Group&quot; to create
                  one.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Social Links</h4>
              <Button
                size="sm"
                variant="default"
                onClick={addSocialLink}
                className="text-xs h-8"
              >
                <Plus size={14} className="mr-1" />
                Add Social
              </Button>
            </div>

            <div className="space-y-3">
              {(content.socialLinks || []).map((link, index) => (
                <div key={index} className="flex mb-2 items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={link.label}
                      placeholder="Platform (e.g. Twitter)"
                      onChange={(e) =>
                        handleSocialLinkChange(index, 'label', e.target.value)
                      }
                      className="text-sm h-9"
                    />
                  </div>
                  <div className="flex-[2]">
                    <Input
                      type="url"
                      value={link.link}
                      placeholder="URL (e.g. https://twitter.com)"
                      onChange={(e) =>
                        handleSocialLinkChange(index, 'link', e.target.value)
                      }
                      className="text-sm h-9"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSocialLink(index)}
                    className="p-1 text-gray-400 hover:text-red-500 h-8 w-8"
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              ))}

              {(content.socialLinks || []).length === 0 && (
                <div className="text-center py-2 text-sm text-gray-500">
                  No social links added.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FooterEditor;
