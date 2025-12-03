import { useScrollAnimation } from '@/lib/animations';
import { useState } from 'react';

export default function GallerySection() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const media = [
    { type: 'video', src: '/assets/Animated Video.mov', title: 'Animated Video' },
    { type: 'video', src: '/assets/Bilboard final.mov', title: 'Billboard Video' },
    { title: 'Community Support' },
    { title: 'Rehabilitation Program' },
    { title: 'Education Initiative' },
    { title: 'Job Training' },
    { title: 'Counseling Session' },
    { title: 'Community Event' },
    { title: 'Success Story' },
    { title: 'Workshop' },
    { title: 'Team Meeting' },
    { title: 'Hope and Renewal' },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Our Impact
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Witness the transformation and hope we bring to lives through our dedicated programs and community support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {media.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
              }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  controls
                  className="w-full h-full object-cover"
                  title={item.title}
                />
              ) : (
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center cursor-default">
                  <div className="text-center p-4">
                    <p className="text-white font-semibold text-lg">{item.title}</p>
                  </div>
                </div>
              )}

              {/* 3D border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-300 rounded-xl transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox removed - no images to display */}
    </section>
  );
}