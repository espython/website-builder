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
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  SectionFieldValue,
  useSectionEditor,
} from '@/features/builder/hooks/useSectionEditor';

interface HeaderEditorProps {
  section: Section;
  updateSection: (id: string, content: SectionContent) => void;
}

const HeaderEditor = ({ section, updateSection }: HeaderEditorProps) => {
  // Use the standardized section editor hook
  const { content, handleChange, saveAndClose, isSaved } =
    useSectionEditor<HeaderContent>(section, updateSection);

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
            <label className="block text-sm font-medium text-gray-700">
              Logo URL
            </label>
          </div>
          <div className="flex space-x-4 items-start">
            <div className="w-full">
              <input
                type="text"
                value={content.logo || ''}
                onChange={(e) => handleChange('logo', e.target.value)}
                placeholder="Enter logo URL or leave blank for text logo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">
              Contact Button
            </label>
            <div className="ml-2 flex items-center">
              <input
                type="checkbox"
                checked={content.showContactButton || false}
                onChange={toggleContactButton}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-500">
                Show contact button
              </span>
            </div>
          </div>

          {content.showContactButton && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={content.contactButtonText || ''}
                  onChange={(e) =>
                    handleChange('contactButtonText', e.target.value)
                  }
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link
                </label>
                <input
                  type="text"
                  value={content.contactButtonLink || ''}
                  onChange={(e) =>
                    handleChange('contactButtonLink', e.target.value)
                  }
                  placeholder="#contact"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Menu Items
            </label>
            <button
              type="button"
              onClick={addMenuItem}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={14} className="inline mr-1" />
              Add Item
            </button>
          </div>

          {content.menuItems.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-md">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Link size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No menu items added yet</p>
                <button
                  type="button"
                  onClick={addMenuItem}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add First Item
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {content.menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-md p-4"
                >
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
                        <button
                          type="button"
                          onClick={() => moveMenuItemUp(index)}
                          disabled={index === 0}
                          className={`p-1 ${
                            index === 0
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveMenuItemDown(index)}
                          disabled={index === content.menuItems.length - 1}
                          className={`p-1 ${
                            index === content.menuItems.length - 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => addSubmenuItem(index)}
                          className="p-1 text-gray-400 hover:text-blue-500"
                          title="Add submenu item"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeMenuItem(index)}
                          className="p-1 text-gray-400 hover:text-red-500"
                          title="Remove item"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) =>
                            updateMenuItem(index, 'label', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Link
                        </label>
                        <input
                          type="text"
                          value={item.link}
                          onChange={(e) =>
                            updateMenuItem(index, 'link', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                        <div
                          key={child.id}
                          className="border border-gray-100 rounded-md p-3 bg-gray-50"
                        >
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
                            <button
                              type="button"
                              onClick={() =>
                                removeSubmenuItem(index, childIndex)
                              }
                              className="p-1 text-gray-400 hover:text-red-500"
                              title="Remove submenu item"
                            >
                              <Trash size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Label
                              </label>
                              <input
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
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Link
                              </label>
                              <input
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
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addSubmenuItem(index)}
                        className="mt-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800"
                      >
                        <Plus size={12} className="inline mr-1" />
                        Add Submenu Item
                      </button>
                    </div>
                  )}
                </div>
              ))}
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

export default HeaderEditor;
