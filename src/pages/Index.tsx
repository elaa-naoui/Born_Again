import { useState } from 'react';
import Hero3D from '@/components/Hero3D';
import MissionSection from '@/components/MissionSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Chatbot from '@/components/Chatbot';
import FloatingFlame from '@/components/FloatingFlame';
import ErrorBoundary from '@/components/ErrorBoundary';
// Flame3D removed — replaced by chatbot header icon

export default function Index() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen relative">
      {/* Floating flame button (opens chatbot + plays audio) */}
      <ErrorBoundary>
        <FloatingFlame onClick={toggleChatbot} />
      </ErrorBoundary>

      {/* Chatbot */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

      {/* Main content with higher z-index */}
      <div className="relative" style={{ zIndex: 20, position: 'relative' }}>
        <ErrorBoundary>
          <Hero3D />
        </ErrorBoundary>
        <MissionSection />
        <ActivitiesSection />
        <GallerySection />
        <ContactSection />

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,107,53,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src="/assets/logo.png" alt="BornAgain Logo" className="w-12 h-12 object-contain" />
              <h3 className="text-2xl font-bold">BornAgain</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming lives, building futures, creating hope.
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <a 
                href="https://www.instagram.com/born_again_tn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
              >
                Follow us on Instagram
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 BornAgain NGO. All rights reserved. | Tunis, Tunisia
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}