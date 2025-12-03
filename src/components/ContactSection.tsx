import { useScrollAnimation } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';
import DonationModal from '@/components/DonationModal';
import { useNavigate } from 'react-router-dom';

// Instagram icon: use currentColor so it inherits the parent's foreground (make it white)
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 text-white"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer rounded square */}
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
    {/* Inner camera circle */}
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    {/* Small top-right dot */}
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </svg>
);

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Join Our Mission
          </h2>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Awareness Campaign</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6 flex-wrap">
            <div className="w-full md:w-96">
              <video controls className="w-full rounded-md shadow-md bg-black" controlsList="nodownload">
                <source src="/assets/Animated Video.mp4" type="video/mp4" />
                <p>Your browser does not support the Animated Video MP4.</p>
              </video>
            </div>
            <div className="w-full md:w-96">
              <video controls className="w-full rounded-md shadow-md bg-black" controlsList="nodownload">
                <source src="/assets/Billboard final.mp4" type="video/mp4" />
                <p>Your browser does not support the Billboard final MP4.</p>
              </video>
            </div>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Together, we can create a society that believes in second chances and supports those seeking redemption.
          </p>
        </div>

        {/* Radio Spot Audio Player */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <AudioPlayer 
            src="/assets/Radio-spot.mp3" 
            title="Listen to Our Radio Spot"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card
            className={`p-8 border-2 border-orange-200 bg-white/80 backdrop-blur-sm transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">info@bornagain.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+216 71 123 456</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-600">Tunis, Tunisia</p>
                </div>
              </div>

              <div 
                className="flex items-start gap-4 group cursor-pointer" 
                onClick={() => window.open('https://www.instagram.com/born_again_tn/', '_blank')}
              >
                <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <InstagramIcon />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Instagram</p>
                  <p className="text-gray-600">@born_again_tn</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://online.fliphtml5.com/fkmdb/ulor/index.html#p=1', '_blank')}
              >
                View Our Complete Flyer <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://www.instagram.com/born_again_tn/', '_blank')}
              >
                <div className="mr-2">
                  <InstagramIcon />
                </div>
                Follow Us on Instagram
              </Button>
            </div>
          </Card>

          {/* Call to Action */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card className="p-8 border-2 border-orange-200 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Support Our Cause</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your contribution helps us provide essential services, training, and support to those seeking to rebuild their lives. Every donation makes a difference.
              </p>
              <DonationModal>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                >
                  Make a Donation
                </Button>
              </DonationModal>
            </Card>

            <Card className="p-8 border-2 border-orange-200 bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <h3 className="text-2xl font-bold mb-4">Volunteer With Us</h3>
              <p className="leading-relaxed mb-6 text-orange-50">
                Join our team of dedicated volunteers and help make a real impact in the lives of those seeking redemption and a fresh start.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="w-full bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/forum')}
              >
                Join Our Volunteer Forum
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}