import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Role() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 4000); // تختفي بعد 4 ثواني
    return () => clearTimeout(timer);
  }, []);
  
  
  useEffect(() => {
    const hasSeenMessage = localStorage.getItem('hasSeenWelcome')

    if (!hasSeenMessage) {
      setShowMessage(true)
      localStorage.setItem('hasSeenWelcome', 'true')
    }
  }, [])

  return (
    <div className="relative p-4">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-4 left-1/2 z-50 px-6 py-3 text-white bg-black rounded-xl shadow-xl -translate-x-1/2"
          >
           تاكد من ارسال رساله التاكيد 
          </motion.div>
        )}
      </AnimatePresence>

      {/* باقي الصفحة هنا */}
    </div>
  );
}
