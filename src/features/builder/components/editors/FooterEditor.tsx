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
import { useSectionEditor } from '@/features/builder/hooks/useSectionEditor';

interface FooterEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const FooterEditor = ({ section, updateSection }: FooterEditorProps) => {
  const { saveAndClose, isSaved } = useSectionEditor(section, updateSection);
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
      links: updatedLinks as FooterLink[],
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
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <h4 className="font-medium text-gray-700 mb-3">Logo</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo Text
              </label>
              <input
                type="text"
                value={content.logo?.text || ''}
                onChange={(e) => handleLogoChange('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo Image URL
              </label>
              <input
                type="text"
                value={content.logo?.image || ''}
                onChange={(e) => handleLogoChange('image', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Copyright */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Copyright Text
          </label>
          <input
            type="text"
            value={
              content.copyright ||
              `© ${new Date().getFullYear()} Your Company. All rights reserved.`
            }
            onChange={(e) => handleChange('copyright', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Link Groups Section */}
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Link Groups</h4>
            <button
              type="button"
              onClick={addLinkGroup}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={14} className="inline mr-1" />
              Add Group
            </button>
          </div>

          {(content.linkGroups || []).map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="mb-4 p-3 border border-gray-200 rounded-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <GripVertical size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={group.title}
                    onChange={(e) =>
                      handleLinkGroupChange(groupIndex, 'title', e.target.value)
                    }
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="Group Title"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLinkGroup(groupIndex)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash size={14} />
                </button>
              </div>

              {/* Links in this group */}
              <div className="space-y-2 pl-6">
                {group.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) =>
                        handleLinkChange(
                          groupIndex,
                          linkIndex,
                          'label',
                          e.target.value
                        )
                      }
                      className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Link Label"
                    />
                    <input
                      type="text"
                      value={link.link}
                      onChange={(e) =>
                        handleLinkChange(
                          groupIndex,
                          linkIndex,
                          'link',
                          e.target.value
                        )
                      }
                      className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="URL"
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(groupIndex, linkIndex)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLink(groupIndex)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  <Plus size={14} className="inline mr-1" />
                  Add Link
                </button>
              </div>
            </div>
          ))}

          {(content.linkGroups || []).length === 0 && (
            <div className="text-center py-4 text-sm text-gray-500">
              No link groups added. Click &quot;Add Group&quot; to create one.
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Social Links</h4>
            <button
              type="button"
              onClick={addSocialLink}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={14} className="inline mr-1" />
              Add Social
            </button>
          </div>

          {(content.socialLinks || []).map((link, index) => (
            <div key={index} className="flex mb-2 items-center">
              <div className="flex-1 mr-2">
                <input
                  type="text"
                  value={link.label}
                  placeholder="Platform (e.g. Twitter)"
                  onChange={(e) =>
                    handleSocialLinkChange(index, 'label', e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="flex-[2] mr-2">
                <input
                  type="url"
                  value={link.link}
                  placeholder="URL (e.g. https://twitter.com)"
                  onChange={(e) =>
                    handleSocialLinkChange(index, 'link', e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}

          {(content.socialLinks || []).length === 0 && (
            <div className="text-center py-2 text-sm text-gray-500">
              No social links added.
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-4">
        <button
          onClick={saveAndClose}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default FooterEditor;
