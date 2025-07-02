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
    <div
      className={`py-16 px-8 bg-white cursor-pointer ${
        isSelected ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="max-w-6xl mx-auto">
        {(content.title || content.description) && (
          <div className="text-center mb-12">
            {content.title && (
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="text-lg text-gray-600">{content.description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {content.items?.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg">
              {item.link ? (
                <a href={item.link} onClick={(e) => e.preventDefault()}>
                  <div className="relative group">
                    <img
                      src={item.image}
                      alt={item.caption || ''}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                        <p>{item.caption}</p>
                      </div>
                    )}
                  </div>
                </a>
              ) : (
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.caption || ''}
                    className="w-full h-64 object-cover"
                  />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                      <p>{item.caption}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
