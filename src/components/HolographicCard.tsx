import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function HolographicCard({ children, className = '', delay = 0 }: HolographicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: '1000px' }}
    >
      <Card 
        className={`relative overflow-hidden backdrop-blur-xl bg-white/70 border-2 border-white/20 shadow-2xl ${className}`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
          boxShadow: '0 8px 32px 0 rgba(255, 107, 53, 0.2), inset 0 0 20px rgba(255, 165, 0, 0.1)',
        }}
      >
        {/* Holographic shine effect */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 165, 0, 0.3) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'holographic-shine 3s ease-in-out infinite',
          }}
        />
        
        {/* Glow border */}
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #ff6b35, #ffa500, #ff6b35)',
            backgroundSize: '200% 100%',
            animation: 'glow-border 3s linear infinite',
            opacity: 0.3,
            filter: 'blur(8px)',
          }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </motion.div>
  );
}