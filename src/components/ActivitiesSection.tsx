import { useScrollAnimation } from '@/lib/animations';
import { Briefcase, Brain, Home, Megaphone, Handshake } from 'lucide-react';
import HolographicCard from '@/components/HolographicCard';

export default function ActivitiesSection() {
  const { ref, isVisible } = useScrollAnimation();

  const activities = [
    {
      icon: Briefcase,
      title: 'Job and Education Support',
      description: 'Helping ex-prisoners access training and employment opportunities to rebuild stable, independent lives.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Brain,
      title: 'Psychological and Social Guidance',
      description: 'Providing counseling, mentorship, and emotional support to ease their return to society.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Home,
      title: 'Reintegration Programs',
      description: 'Assisting with housing, documentation, and social reinsertion for a smoother transition after release.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Megaphone,
      title: 'Awareness and Anti-Stigma Campaigns',
      description: 'Promoting public understanding and acceptance through media, workshops, and community events.',
      color: 'from-orange-600 to-red-600',
    },
    {
      icon: Handshake,
      title: 'Partnerships with Institutions',
      description: 'Working with prisons, NGOs, and local authorities to strengthen rehabilitation efforts and social justice.',
      color: 'from-red-600 to-orange-600',
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Our Main Activities
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive support programs designed to facilitate successful reintegration and build a brighter future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <HolographicCard key={index} delay={index * 0.1}>
              <div className="p-8">
                <div
                  className={`bg-gradient-to-br ${activity.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 hover:scale-110 hover:rotate-12 shadow-lg`}
                >
                  <activity.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {activity.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );
}