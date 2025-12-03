import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function FlameModel3D() {
  const { scene } = useGLTF('/assets/flame.glb');
  const [sceneClone] = React.useState(() => scene.clone(true));
  const groupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    // Configure cloned scene meshes
    sceneClone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else if (mesh.material) {
          mesh.material = mesh.material.clone();
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [sceneClone]);

  // Animation loop for 3D rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5; // Slow rotation
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1; // Subtle up-down tilt
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]} scale={1.2}>
      <primitive object={sceneClone} />
    </group>
  );
}

export default function FloatingFlame({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    try {
      window.dispatchEvent(new CustomEvent('chatbot:play'));
    } catch (e) {
      const ev = document.createEvent('Event');
      ev.initEvent('chatbot:play', true, true);
      window.dispatchEvent(ev);
    }
  };

  return (
    <button
      aria-label="Open chatbot and play flame audio"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 w-24 h-24 rounded-full shadow-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center z-50 transition-all duration-300 overflow-hidden ${
        isHovered ? 'shadow-orange-500/80 scale-125' : 'shadow-orange-500/50 scale-100'
      }`}
      title="Click to open chatbot and play audio"
    >
      {/* 3D Flame Model as Icon */}
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b35" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ffa500" />
        <FlameModel3D />
      </Canvas>
    </button>
  );
}