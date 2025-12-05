import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import FlameIcon from '@/components/FlameIcon';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Born Again NGO was established to address pressing issues of peace and justice in Tunisia, focusing on Sustainable Development Goal 16.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/Magician-red.mp3');
      audioRef.current.loop = false; // ✅ Play once, not looping
      audioRef.current.preload = 'auto';
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', () => setIsPlaying(false));
    }

    const onPlayEvent = () => {
      // Start playing audio when an external component requests it
      try {
        if (audioRef.current && !isPlaying) {
          audioRef.current.currentTime = 0; // Reset to start
          audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (e) {
        console.warn('[Chatbot] play event failed', e);
      }
    };

    window.addEventListener('chatbot:play', onPlayEvent as EventListener);

    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (e) {
          // ignore
        }
      }
      window.removeEventListener('chatbot:play', onPlayEvent as EventListener);
    };
  }, [isPlaying]);

  const toggleAudio = async () => {
    try {
      if (!audioRef.current) return;

      if (isPlaying) {
        // Mute the audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        // Play audio once (from start)
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn('[Chatbot] Audio toggle failed', err);
    }
  };

  function FlameModel(props: any) {
    const gltf = useGLTF('/assets/flame.glb') as any;
    // clone scene so multiple instances are safe
    const scene = gltf?.scene?.clone?.() ?? null;
    return scene ? <primitive object={scene} {...props} /> : null;
  }

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response with contextual reply for 'what is born again' question
    setTimeout(() => {
      const userText = inputValue.toLowerCase();
      let reply = 'Thank you for your message! Our team will get back to you soon. For immediate assistance, please contact us at +216 123 456 789 or email contact@bornagain-tn.org';
      if (userText.includes('what is born again') || userText.includes('what is bornagain') || userText.includes('born again')) {
        reply = 'Born Again NGO was established to address pressing issues of peace and justice in Tunisia, focusing on Sustainable Development Goal 16.';
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: reply,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Keep the component mounted so slide-in/out animation works

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 h-[500px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-500/30 z-50 flex flex-col overflow-hidden transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
      }`}
      style={{
        boxShadow: '0 0 40px rgba(255, 107, 53, 0.3), inset 0 0 40px rgba(255, 107, 53, 0.1)',
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            aria-label="Play chatbot audio"
            onClick={toggleAudio}
            type="button"
            className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ring-2 ring-transparent ${isPlaying ? 'ring-orange-400' : ''}`}
            title={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            <Canvas style={{ width: '48px', height: '48px' }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 0, 5]} />
              <FlameModel />
            </Canvas>
          </button>
          <div>
            <h3 className="text-white font-bold text-lg">BornAgain Chatbot</h3>
            <p className="text-white/80 text-xs">We're here to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
          />
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}