'use client';

import { ContactContent } from '@/features/sections/types/section';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { InlineEditableField } from './common/InlineEditableField';
import { PreviewMode } from '@/features/preview/store/uiStore';

interface ContactSectionProps {
  content: ContactContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  previewMode: PreviewMode;
}

const ContactSection = ({
  content,
  isSelected,
  onClick,
  id,
  previewMode,
}: ContactSectionProps) => {
  const updateSection = useUpdateSection();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedContent = { ...content };

    if (field === 'title') {
      updatedContent.title = value;
    } else if (field === 'description') {
      updatedContent.description = value;
    } else if (field === 'email') {
      updatedContent.email = value;
    } else if (field === 'phone') {
      updatedContent.phone = value;
    } else if (field === 'address') {
      updatedContent.address = value;
    } else if (field === 'formTitle') {
      updatedContent.title = value;
    } else if (field === 'buttonText') {
      updatedContent.buttonText = value;
    }

    updateSection(id, updatedContent);
  };

  return (
    <Card
      className={`${previewMode === 'mobile' ? 'py-6 px-3' : previewMode === 'tablet' ? 'py-8 px-4' : 'py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6'} bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div
        className={`container mx-auto ${previewMode === 'mobile' ? 'px-1' : 'px-2 sm:px-4'}`}
      >
        <div
          className={`text-center ${previewMode === 'mobile' ? 'mb-5' : previewMode === 'tablet' ? 'mb-6' : 'mb-8 sm:mb-10 md:mb-12'}`}
        >
          <h2
            className={`${previewMode === 'mobile' ? 'text-xl' : previewMode === 'tablet' ? 'text-2xl' : 'text-2xl sm:text-2xl md:text-3xl'} font-bold ${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
          >
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected && previewMode === 'desktop'}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p
              className={`${previewMode === 'mobile' ? 'text-sm' : previewMode === 'tablet' ? 'text-base' : 'text-base sm:text-lg'} text-gray-600 max-w-2xl mx-auto`}
            >
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected && previewMode === 'desktop'}
                className="inline-block"
              />
            </p>
          )}
        </div>

        <div
          className={`grid grid-cols-1 ${previewMode === 'mobile' ? 'gap-4' : previewMode === 'tablet' ? 'gap-5' : 'gap-6 md:gap-8'} ${previewMode === 'mobile' || previewMode === 'tablet' ? '' : 'lg:grid-cols-5'}`}
        >
          {/* Contact Info */}
          <div
            className={`${previewMode === 'mobile' || previewMode === 'tablet' ? '' : 'lg:col-span-2'} ${previewMode === 'mobile' ? 'space-y-3' : previewMode === 'tablet' ? 'space-y-4' : 'space-y-4 sm:space-y-6'}`}
          >
            {content.email && (
              <div className="flex items-start">
                <div
                  className={`bg-blue-100 ${previewMode === 'mobile' ? 'p-1.5 mr-2' : previewMode === 'tablet' ? 'p-2 mr-3' : 'p-2 sm:p-3 rounded-full mr-3 sm:mr-4'} rounded-full`}
                >
                  <Mail
                    className={`${previewMode === 'mobile' ? 'h-4 w-4' : previewMode === 'tablet' ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} text-blue-600`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium mb-1 ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    Email
                  </h3>
                  <p
                    className={`text-gray-600 ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    <InlineEditableField
                      value={content.email}
                      onChange={(newValue) =>
                        handleFieldUpdate('email', newValue)
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block"
                    />
                  </p>
                </div>
              </div>
            )}

            {content.phone && (
              <div className="flex items-start">
                <div
                  className={`bg-blue-100 ${previewMode === 'mobile' ? 'p-1.5 mr-2' : previewMode === 'tablet' ? 'p-2 mr-3' : 'p-2 sm:p-3 rounded-full mr-3 sm:mr-4'} rounded-full`}
                >
                  <Phone
                    className={`${previewMode === 'mobile' ? 'h-4 w-4' : previewMode === 'tablet' ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} text-blue-600`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium mb-1 ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    Phone
                  </h3>
                  <p
                    className={`text-gray-600 ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    <InlineEditableField
                      value={content.phone}
                      onChange={(newValue) =>
                        handleFieldUpdate('phone', newValue)
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block"
                    />
                  </p>
                </div>
              </div>
            )}

            {content.address && (
              <div className="flex items-start">
                <div
                  className={`bg-blue-100 ${previewMode === 'mobile' ? 'p-1.5 mr-2' : previewMode === 'tablet' ? 'p-2 mr-3' : 'p-2 sm:p-3 rounded-full mr-3 sm:mr-4'} rounded-full`}
                >
                  <MapPin
                    className={`${previewMode === 'mobile' ? 'h-4 w-4' : previewMode === 'tablet' ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} text-blue-600`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium mb-1 ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    Address
                  </h3>
                  <p
                    className={`text-gray-600 ${previewMode === 'mobile' ? 'text-xs' : previewMode === 'tablet' ? 'text-sm' : 'text-sm sm:text-base'}`}
                  >
                    <InlineEditableField
                      value={content.address}
                      onChange={(newValue) =>
                        handleFieldUpdate('address', newValue)
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="inline-block whitespace-pre-wrap"
                    />
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div
            className={`${previewMode === 'mobile' || previewMode === 'tablet' ? '' : 'lg:col-span-3'}`}
          >
            <Card
              className={`${previewMode === 'mobile' ? 'p-3' : previewMode === 'tablet' ? 'p-4' : 'p-4 sm:p-5 md:p-6'} shadow-md`}
            >
              <h3
                className={`${previewMode === 'mobile' ? 'text-base' : previewMode === 'tablet' ? 'text-lg' : 'text-lg sm:text-xl'} font-bold ${previewMode === 'mobile' ? 'mb-2' : 'mb-3 sm:mb-4'}`}
              >
                <InlineEditableField
                  value={content.title || 'Send us a message'}
                  onChange={(newValue) =>
                    handleFieldUpdate('formTitle', newValue)
                  }
                  isEditable={isSelected && previewMode === 'desktop'}
                  className="inline-block"
                />
              </h3>
              <form>
                <div
                  className={`grid grid-cols-1 ${previewMode === 'mobile' ? 'gap-3' : 'gap-4'} ${previewMode === 'mobile' ? '' : 'sm:grid-cols-2'} mb-4`}
                >
                  <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      className={`w-full ${previewMode === 'mobile' ? 'text-sm py-1' : ''}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      className={`w-full ${previewMode === 'mobile' ? 'text-sm py-1' : ''}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Subject"
                    className={`w-full ${previewMode === 'mobile' ? 'text-sm py-1' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div
                  className={`${previewMode === 'mobile' ? 'mb-4' : 'mb-6'}`}
                >
                  <Textarea
                    placeholder="Your message"
                    rows={previewMode === 'mobile' ? 3 : 4}
                    className={`w-full ${previewMode === 'mobile' ? 'text-sm' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${previewMode === 'mobile' ? 'text-xs py-1' : previewMode === 'tablet' ? 'text-sm py-1.5' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <InlineEditableField
                      value={content.buttonText || 'Send Message'}
                      onChange={(newValue) =>
                        handleFieldUpdate('buttonText', newValue)
                      }
                      isEditable={isSelected && previewMode === 'desktop'}
                      className="text-white"
                    />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactSection;
