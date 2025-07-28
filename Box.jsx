// src/Box.jsx
import { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import BottomNav from '../components/BottomNav';
function Box() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef(null);
  const bgAudio = useRef(new Audio("/songs/mixkit-ocean-game-movement-water-air-tank-bubbles-huge-long-3017.wav"));



  useEffect(() => {
    const audio = bgAudio.current;
    audio.loop = true;
    audio.volume = 0.3; // Adjust volume as needed
    audio.play().catch((e) => console.log("Autoplay blocked:", e));
  
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  const messages = [
    {
        id: 1,
        text: "انا موجود هنا علشانك على طول يا حبيبتي، خدي راحتك في التعب وانا موجود دايمًا في ضهرك",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-soft-piano-melody-2323.mp3"
      },
      {
        id: 2,
        text: "بحبك حتى وانتي ساكتة، حتى وانتي بتعيطي.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-romantic-piano-loop-2395.mp3"
      },
      {
        id: 3,
        text: "انتي مش لوحدك، عمري ما هسيبك.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-close-up-1183.mp3"
      },
      {
        id: 4,
        text: "حتى لو مش قادرة تتكلمي، وجودك لوحده كفاية بالنسبة لي.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-rain-drops-on-glass-2398.mp3"
      },
      {
        id: 5,
        text: "مش هسيب إيدك، حتى لو الدنيا كلها سابتنا.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-deep-ambient-1056.mp3"
      },
      {
        id: 6,
        text: "أنا معاكي مش عشان لازم، عشان قلبي مرتاح جنبك.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-love-soft-piano-689.mp3"
      },
      {
        id: 7,
        text: "أنا فاهمك من غير ما تتكلمي، وحاسس بيكي.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-soft-romantic-piano-2377.mp3"
      },
      {
        id: 8,
        text: "أنا مش بخاف من المستقبل طول ما انتي فيه.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-relaxing-piano-2320.mp3"
      },
      {
        id: 9,
        text: "أنا عايزك تكوني مطمنة إنك لو وقعتِ، أول حضن هتلاقيه هو حضني.",
        audio: "https://assets.mixkit.co/sfx/preview/mixkit-touching-piano-2337.mp3"
      },
      {
        id: 10,
        text: ".....",
        audio: "/songs/WhatsApp Ptt 2025-07-24 at 7.47.01 PM.ogg"
      },
      {
        id: 11,
        text: ".....",
        audio: "/songs/WhatsApp Ptt 2025-07-24 at 7.47.31 PM.ogg"
      },
      {
        id: 12,
        text: ".....",
        audio: "/songs/WhatsApp Ptt 2025-07-24 at 7.48.00 PM.ogg"
      },
      {
        id: 13,
        text: ".....",
        audio: "/songs/WhatsApp Ptt 2025-07-24 at 7.49.16 PM.ogg"
      },
  ];

  const handleBoxClick = () => {
    if (isOpen) {
      // Close the message
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 500);
    } else {
      // Open the message
      setIsAnimating(true);
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setIsOpen(true);
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.src = messages[randomIndex].audio;
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      }
    }
  };

  // Generate bubbles for the ocean effect
  const bubbles = Array.from({ length: 20 }).map((_, i) => (
    <div 
      key={i}
      className="absolute rounded-full bg-white opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 50}%`,
        width: `${Math.random() * 20 + 5}px`,
        height: `${Math.random() * 20 + 5}px`,
        animation: `bubble-rise ${Math.random() * 15 + 10}s infinite linear`,
        animationDelay: `${Math.random() * 5}s`
      }}
    />
  ));

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-900 to-blue-700 justify-between overflow-x-hidden font-sans pb-20">
      {/* Ocean surface */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-300 to-blue-400 opacity-30"></div>
      
      {/* Ocean waves */}
      <div className="absolute top-1/3 left-0 w-full h-16 -translate-y-1/2 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-[200%] h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23ffffff' fill-opacity='0.2' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'%3E%3C/path%3E%3C/svg%3E")`,
            animation: 'wave-animation 15s linear infinite'
          }}
        ></div>
      </div>
      
      {/* Ocean bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles}
      </div>
      
      <audio ref={audioRef} className="hidden" />
      
      <div className="relative z-10">
      <header className="flex items-center bg-[#221112] p-4 justify-between">
        {/* Back button & title */}
<button onClick={() => window.history.back()} >
 < ArrowLeftIcon className="w-6 h-6" />
</button>
<h2 className="text-lg font-bold mr-25">Jimmy & Basmala</h2>
       
      </header>
        
        <div className="p-4 flex flex-col items-center mt-20">
          <div 
            className="relative w-full max-w-xs mb-8 cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={handleBoxClick}
          >
            {/* Treasure box */}
            <div className="relative z-20">
              {/* Box lid - rotates when open */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-transform duration-700 origin-bottom ${
                isOpen ? 'rotate-[-90deg]' : 'rotate-0'
              }`}>
                <div className="bg-amber-700 w-48 h-20 rounded-t-lg"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-amber-900 w-24 h-6 rounded-full"></div>
                </div>
              </div>
              
              {/* Box base */}
              <div className="bg-amber-800 w-56 h-32 mx-auto rounded-lg flex items-center justify-center relative pt-8">
                <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <div className="bg-amber-300 w-6 h-6 rounded-full"></div>
                </div>
                
                {/* Water inside the box */}
                <div className={`absolute bottom-0 left-0 w-full bg-blue-500/50 transition-all duration-1000 ${
                  isOpen ? 'h-0' : 'h-full'
                }`}></div>
              </div>
            </div>
            
            {/* Water effect around box */}
            <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-32 rounded-full bg-blue-500/30 ${
              isAnimating ? (isOpen ? 'animate-wave-open' : 'animate-wave-close') : ''
            }`}></div>
            
            {/* Message bubble */}
            {isOpen && (
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 ${
                isAnimating ? 'animate-message-rise' : ''
              }`}>
                <div className="bg-amber-50 p-4 rounded-2xl shadow-xl max-w-xs border-4 border-amber-200">
                  <div className="text-amber-800 font-serif italic text-center text-sm">
                    {currentMessage?.text}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Only open it when you're confused
            </p>
            <p className="text-blue-200 text-base font-normal leading-normal mt-2">
              {isOpen ? "Click the treasure box to close" : "Click the treasure box to reveal a message"}
            </p>
          </div>
        </div>
      </div>
      
       <BottomNav  />
    </div>
  );
}

export default Box;