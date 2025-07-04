'use client';

import { ContactContent } from '@/features/sections/types/section';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useUpdateSection } from '../hooks/sections-hook';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { InlineEditableField } from './common/InlineEditableField';

interface ContactSectionProps {
  content: ContactContent;
  isSelected: boolean;
  onClick: () => void;
  id: string;
}

const ContactSection = ({
  content,
  isSelected,
  onClick,
  id,
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
      className={`py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6 bg-white cursor-pointer rounded-none ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            <InlineEditableField
              value={content.title}
              onChange={(newValue) => handleFieldUpdate('title', newValue)}
              isEditable={isSelected}
              className="inline-block"
            />
          </h2>
          {content.description && (
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              <InlineEditableField
                value={content.description}
                onChange={(newValue) =>
                  handleFieldUpdate('description', newValue)
                }
                isEditable={isSelected}
                className="inline-block"
              />
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {content.email && (
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Email
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <InlineEditableField
                      value={content.email}
                      onChange={(newValue) =>
                        handleFieldUpdate('email', newValue)
                      }
                      isEditable={isSelected}
                      className="inline-block"
                    />
                  </p>
                </div>
              </div>
            )}

            {content.phone && (
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Phone
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <InlineEditableField
                      value={content.phone}
                      onChange={(newValue) =>
                        handleFieldUpdate('phone', newValue)
                      }
                      isEditable={isSelected}
                      className="inline-block"
                    />
                  </p>
                </div>
              </div>
            )}

            {content.address && (
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Address
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <InlineEditableField
                      value={content.address}
                      onChange={(newValue) =>
                        handleFieldUpdate('address', newValue)
                      }
                      isEditable={isSelected}
                      className="inline-block whitespace-pre-wrap"
                    />
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="p-4 sm:p-5 md:p-6 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                <InlineEditableField
                  value={content.title || 'Send us a message'}
                  onChange={(newValue) =>
                    handleFieldUpdate('formTitle', newValue)
                  }
                  isEditable={isSelected}
                  className="inline-block"
                />
              </h3>
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Subject"
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="mb-6">
                  <Textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
                      isEditable={isSelected}
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
