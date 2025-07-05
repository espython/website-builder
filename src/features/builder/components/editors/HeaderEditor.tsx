'use client';

import {
  Section,
  HeaderContent,
  MenuItem,
  SectionContent,
} from '@/features/sections/types/section';
import {
  Trash,
  Plus,
  GripVertical,
  Link,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  SectionFieldValue,
  useSectionEditor,
} from '@/features/builder/hooks/useSectionEditor';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent } from '@/shared/components/ui/card';

interface HeaderEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const HeaderEditor = ({ section, updateSection }: HeaderEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange } = useSectionEditor<HeaderContent>(
    section,
    updateSection
  );

  // Add new menu item at the top level
  const addMenuItem = () => {
    const newMenuItem: MenuItem = {
      id: uuidv4(),
      label: 'New Menu Item',
      link: '#',
    };
    const updatedItems = [...content.menuItems, newMenuItem];
    handleChange('menuItems', updatedItems);
  };

  // Remove menu item
  const removeMenuItem = (index: number) => {
    const updatedItems = [...content.menuItems];
    updatedItems.splice(index, 1);
    handleChange('menuItems', updatedItems);
  };

  // Update menu item property
  const updateMenuItem = (
    index: number,
    field: keyof MenuItem,
    value: SectionFieldValue
  ) => {
    const updatedItems = [...content.menuItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('menuItems', updatedItems);
  };

  // Add submenu item (child) to a menu item
  const addSubmenuItem = (parentIndex: number) => {
    const updatedItems = [...content.menuItems];
    const parentItem = updatedItems[parentIndex];

    const newSubItem: MenuItem = {
      id: uuidv4(),
      label: 'New Submenu Item',
      link: '#',
    };

    const children = parentItem.children ? [...parentItem.children] : [];
    updatedItems[parentIndex] = {
      ...parentItem,
      children: [...children, newSubItem],
    };

    handleChange('menuItems', updatedItems);
  };

  // Remove submenu item
  const removeSubmenuItem = (parentIndex: number, childIndex: number) => {
    const updatedItems = [...content.menuItems];
    const parentItem = updatedItems[parentIndex];

    if (!parentItem.children) return;

    const updatedChildren = [...parentItem.children];
    updatedChildren.splice(childIndex, 1);

    updatedItems[parentIndex] = {
      ...parentItem,
      children: updatedChildren.length > 0 ? updatedChildren : undefined,
    };

    handleChange('menuItems', updatedItems);
  };

  // Update submenu item property
  const updateSubmenuItem = (
    parentIndex: number,
    childIndex: number,
    field: keyof MenuItem,
    value: SectionFieldValue
  ) => {
    const updatedItems = [...content.menuItems];
    const parentItem = updatedItems[parentIndex];

    if (!parentItem.children) return;

    const updatedChildren = [...parentItem.children];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      [field]: value,
    };

    updatedItems[parentIndex] = {
      ...parentItem,
      children: updatedChildren,
    };

    handleChange('menuItems', updatedItems);
  };

  // Move menu items up/down
  const moveMenuItem = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      fromIndex >= content.menuItems.length ||
      toIndex < 0 ||
      toIndex >= content.menuItems.length
    ) {
      return;
    }

    const updatedItems = [...content.menuItems];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    handleChange('menuItems', updatedItems);
  };

  // Move menu item up
  const moveMenuItemUp = (index: number) => {
    moveMenuItem(index, index - 1);
  };

  // Move menu item down
  const moveMenuItemDown = (index: number) => {
    moveMenuItem(index, index + 1);
  };

  // Toggle contact button visibility
  const toggleContactButton = () => {
    handleChange('showContactButton', !content.showContactButton);
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
          Header Content
        </h3>

        {/* Logo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="logo-url">Logo URL</Label>
          </div>
          <div className="flex space-x-4 items-start">
            <div className="w-full">
              <Input
                id="logo-url"
                type="text"
                value={content.logo || ''}
                onChange={(e) => handleChange('logo', e.target.value)}
                placeholder="Enter logo URL or leave blank for text logo"
              />
            </div>
            {content.logo && (
              <div className="flex-shrink-0 h-10 w-10 border border-gray-200 rounded-md overflow-hidden">
                <img
                  src={content.logo}
                  alt="Logo preview"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/40?text=Logo';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Contact Button */}
        <div className="space-y-4 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="contact-button">Contact Button</Label>
            <div className="ml-2 flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contact-button"
                  checked={content.showContactButton || false}
                  onCheckedChange={toggleContactButton}
                />
                <Label
                  htmlFor="contact-button"
                  className="text-sm text-gray-500"
                >
                  Show contact button
                </Label>
              </div>
            </div>
          </div>

          {content.showContactButton && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  type="text"
                  value={content.contactButtonText || ''}
                  onChange={(e) =>
                    handleChange('contactButtonText', e.target.value)
                  }
                  placeholder="Contact Us"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button-link">Button Link</Label>
                <Input
                  id="button-link"
                  type="text"
                  value={content.contactButtonLink || ''}
                  onChange={(e) =>
                    handleChange('contactButtonLink', e.target.value)
                  }
                  placeholder="#contact"
                />
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-3">
            <Label>Menu Items</Label>
            <Button
              type="button"
              onClick={addMenuItem}
              size="sm"
              className="h-8 text-xs"
            >
              <Plus size={14} className="mr-1" />
              Add Item
            </Button>
          </div>

          {content.menuItems.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Link size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No menu items added yet</p>
                <Button onClick={addMenuItem} className="mt-2" size="sm">
                  Add First Item
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {content.menuItems.map((item, index) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    {/* Main menu item */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <GripVertical
                            size={16}
                            className="text-gray-400 mr-2"
                          />
                          <span className="text-sm font-medium">
                            Menu Item {index + 1}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            onClick={() => moveMenuItemUp(index)}
                            disabled={index === 0}
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-8 w-8 ${index === 0 ? 'opacity-50' : ''}`}
                            title="Move up"
                          >
                            <ArrowUp size={14} />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => moveMenuItemDown(index)}
                            disabled={index === content.menuItems.length - 1}
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-8 w-8 ${index === content.menuItems.length - 1 ? 'opacity-50' : ''}`}
                            title="Move down"
                          >
                            <ArrowDown size={14} />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => addSubmenuItem(index)}
                            variant="ghost"
                            size="sm"
                            className="p-1 text-gray-400 hover:text-blue-500 h-8 w-8"
                            title="Add submenu item"
                          >
                            <ChevronDown size={16} />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => removeMenuItem(index)}
                            variant="ghost"
                            size="sm"
                            className="p-1 text-gray-400 hover:text-red-500 h-8 w-8"
                            title="Remove item"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`menu-label-${index}`}>Label</Label>
                          <Input
                            id={`menu-label-${index}`}
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              updateMenuItem(index, 'label', e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`menu-link-${index}`}>Link</Label>
                          <Input
                            id={`menu-link-${index}`}
                            type="text"
                            value={item.link}
                            onChange={(e) =>
                              updateMenuItem(index, 'link', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submenu items */}
                    {item.children && item.children.length > 0 && (
                      <div className="ml-6 border-l-2 border-gray-200 pl-4 space-y-3">
                        <div className="text-xs font-medium text-gray-500 mb-2">
                          Submenu Items
                        </div>
                        {item.children.map((child, childIndex) => (
                          <Card key={child.id} className="bg-gray-50">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <ChevronRight
                                    size={14}
                                    className="text-gray-400 mr-1"
                                  />
                                  <span className="text-xs font-medium">
                                    Submenu {childIndex + 1}
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    removeSubmenuItem(index, childIndex)
                                  }
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 text-gray-400 hover:text-red-500 h-7 w-7"
                                  title="Remove submenu item"
                                >
                                  <Trash size={14} />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label
                                    htmlFor={`submenu-label-${index}-${childIndex}`}
                                    className="text-xs"
                                  >
                                    Label
                                  </Label>
                                  <Input
                                    id={`submenu-label-${index}-${childIndex}`}
                                    type="text"
                                    value={child.label}
                                    onChange={(e) =>
                                      updateSubmenuItem(
                                        index,
                                        childIndex,
                                        'label',
                                        e.target.value
                                      )
                                    }
                                    className="h-8 text-sm"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label
                                    htmlFor={`submenu-link-${index}-${childIndex}`}
                                    className="text-xs"
                                  >
                                    Link
                                  </Label>
                                  <Input
                                    id={`submenu-link-${index}-${childIndex}`}
                                    type="text"
                                    value={child.link}
                                    onChange={(e) =>
                                      updateSubmenuItem(
                                        index,
                                        childIndex,
                                        'link',
                                        e.target.value
                                      )
                                    }
                                    className="h-8 text-sm"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => addSubmenuItem(index)}
                          className="text-xs px-0 h-6"
                        >
                          <Plus size={12} className="mr-1" />
                          Add Submenu Item
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;
