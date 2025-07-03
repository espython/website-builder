'use client';

import { ContactContent } from '@/features/sections/types/section';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactSectionProps {
  content: ContactContent;
  isSelected: boolean;
  onClick: () => void;
}

const ContactSection = ({
  content,
  isSelected,
  onClick,
}: ContactSectionProps) => {
  return (
    <section
      className={`py-16 px-8 bg-white cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          {content.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-6">Get in touch</h3>

            {content.email && (
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{content.email}</p>
                </div>
              </div>
            )}

            {content.phone && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">{content.phone}</p>
                </div>
              </div>
            )}

            {content.address && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-800">{content.address}</p>
                </div>
              </div>
            )}

            {/* Social Links */}
            {content.socialLinks && content.socialLinks.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Connect with us</h4>
                <div className="flex space-x-4">
                  {content.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.link}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          {content.showForm !== false && (
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
              <form>
                <div className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Map Embed */}
        {content.mapUrl && (
          <div className="mt-12 h-80 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Location Map"
              src={content.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
