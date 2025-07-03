'use client';

import { GalleryContent } from '@/features/sections/types/section';

interface GallerySectionProps {
  content: GalleryContent;
  isSelected: boolean;
  onClick: () => void;
}

const GallerySection = ({
  content,
  isSelected,
  onClick,
}: GallerySectionProps) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item) => (
            <div key={item.id} className="group">
              <a
                href={item.link || '#'}
                className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                onClick={(e) => e.preventDefault()}
              >
                <div className="relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.caption || 'Gallery image'}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
