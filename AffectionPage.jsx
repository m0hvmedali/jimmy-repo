// src/AffectionPage.jsx
import axios from "axios";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import { useNotifications } from '../context/NotificationContext';
import { Heart, HeartPlusIcon } from 'lucide-react';
import Role from './role'
export default function AffectionPage() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);
  const { addNotification } = useNotifications();

  const sendMessage = async () => {
    
      fetch("https://7272482a-5957-4ed9-8b35-25ac4da052be-00-2295fyy12qka1.worf.replit.dev/send-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: "+201225995129", // رقم الموبايل المطلوب
          message: "msg for you from:jimmy, say:حابب افكرك اني بحبك  واني بحترم اي حاجه بتحسي بيها او اي حاجه بتدايقك سواء مني او لا وبكون مستنيكي تحكيلي ونتكلم في الموضوع لغايه لما نوصل لحل  وعايز افكرك كمان اني بحب صوتك  ودايما بكون كويس وانا بسمعه  واحنا بنتكلم  دايما بكون مبسوط عشان زي ما قولتلك قبل كدا انتي مصدر الدوبامين بتاعي و من غيرك يومي مبيكونش كويس، بحبك  وربنا يخليكي ليا يبوسي"
        })
      })
      .then(res => res.json())
      .then(data => console.log("✅ Response:", data))
      .catch(err => console.error("❌ Error:", err));
    
  }
  
  const handleButtonClick = () => {

     addNotification({
      title: "Affection",
      content: "استعملن ال Affection النهارده",
      icon: <HeartPlusIcon className="text-green-400" />,
    });

    if (!isSending && !isSent) {
        sendMessage();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#330a0c] to-[#221112] justify-between overflow-hidden font-sans">
      {/* Background hearts */}
      <div className="overflow-hidden absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center bg-[#330a0c] p-4 pb-2 justify-between">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 pr-12">
            Affection
          </h2>
        </div>
        
        <div className="flex flex-col items-center px-4 py-8">
          <p className="text-[#ff9aa2] text-base font-normal leading-normal pb-3 pt-1 text-center mb-8">
            For Basmala, from Jimmy
          </p>
          
          <div className="relative">
            <motion.button
              ref={buttonRef}
              onClick={handleButtonClick}
              className="relative z-10 flex min-w-[200px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSending || isSent}
            >
              <AnimatePresence mode="wait">
                {isSending ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </motion.span>
                ) : isSent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Sent!
                  </motion.span>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    I need affection right now
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Button pulse effect */}
            {!isSending && !isSent && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] rounded-xl opacity-70 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            )}
            
            {/* Confetti effect when sent */}
            <AnimatePresence>
              {isSent && (
                <>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute z-20 text-xl text-red-500"
                      style={{
                        left: '50%',
                        top: '50%',
                        x: 0,
                        y: 0,
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, Math.random() * -100 - 50],
                        opacity: [1, 0],
                        scale: [1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    >
                      <Heart />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
          
          {/* Status message */}
          <div className="mt-8 min-h-[40px]">
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-center text-red-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Role />
      
    
      <BottomNav />
    </div>
  );
}