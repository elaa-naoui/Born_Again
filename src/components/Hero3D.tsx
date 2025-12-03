import { useParallax } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero3D() {
  const offsetY = useParallax();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Holographic background elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)',
            transform: `translateY(${offsetY * 0.1}px)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)',
            transform: `translateY(${offsetY * 0.15}px)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 pt-20 pb-32" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <motion.div
            className="space-y-8 relative z-20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ transform: `translateY(${offsetY * 0.05}px)` }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.img
                src="/assets/logo.png"
                alt="BornAgain Logo"
                className="w-24 h-24 object-contain drop-shadow-2xl relative z-20"
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(255,107,53,0.5))',
                    'drop-shadow(0 0 40px rgba(255,165,0,0.8))',
                    'drop-shadow(0 0 20px rgba(255,107,53,0.5))',
                  ],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transform: `translateY(${offsetY * 0.08}px)` }}
              />
              <motion.h1 
                className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent relative z-20"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ 
                  backgroundSize: '200% 200%',
                  transform: `translateY(${offsetY * 0.08}px)`
                }}
              >
                BornAgain
              </motion.h1>
            </div>

            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Everyone Deserves a{' '}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Second Chance
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-700 leading-relaxed relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              At BornAgain, we believe in transformation. Our mission is to help former prisoners rise from their past by providing psychological support, education, and professional opportunities.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Involved <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/70"
                onClick={() => window.open('https://online.fliphtml5.com/fkmdb/ulor/index.html#p=1', '_blank')}
              >
                View Our Flyer <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Billboard with 3D effect */}
          <motion.div
            className="relative z-20"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transform: `translateY(${offsetY * 0.08}px)` }}
          >
            <div className="relative group" style={{ perspective: '1000px' }}>
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-2xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src="/assets/billboard.jpg"
                alt="BornAgain Mission"
                className="relative w-full rounded-2xl shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.5 }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              />
            </div>

            {/* Floating holographic elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl"
              style={{ 
                background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)',
                transform: `translateY(${offsetY * 0.12}px)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-2xl"
              style={{ 
                background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, transparent 70%)',
                transform: `translateY(${offsetY * 0.1}px)`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-orange-600 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/30">
          <motion.div 
            className="w-1.5 h-3 bg-orange-600 rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}