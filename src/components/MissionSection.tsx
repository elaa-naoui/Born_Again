import { useScrollAnimation } from '@/lib/animations';
import { Heart, Target, Users } from 'lucide-react';
import HolographicCard from '@/components/HolographicCard';

export default function MissionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Holographic background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We aim to transform exclusion into hope and give each person the chance to rebuild their life with dignity — for themselves, their families, and a stronger, more peaceful Tunisia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Heart,
              title: 'Compassion',
              description: 'We believe in the inherent worth of every individual and their capacity for positive change.',
              delay: 0.1,
            },
            {
              icon: Target,
              title: 'Purpose',
              description: 'Providing clear pathways to education, employment, and social reintegration.',
              delay: 0.3,
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Building bridges between former prisoners and society through understanding and support.',
              delay: 0.5,
            },
          ].map((item, index) => (
            <HolographicCard key={index} delay={item.delay}>
              <div className="p-8">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <item.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
