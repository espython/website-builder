'use client';

import { ContactContent } from '@/features/sections/types/section';

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
    <div
      className={`py-16 px-8 bg-white cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg text-gray-600">{content.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {content.showForm && (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your name"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your email"
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
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            {content.email && (
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p>{content.email}</p>
              </div>
            )}

            {content.phone && (
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p>{content.phone}</p>
              </div>
            )}

            {content.address && (
              <div>
                <h3 className="font-medium mb-1">Address</h3>
                <p>{content.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
