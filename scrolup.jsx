// ScrollToTopButton.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';


export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
 
  // متابعة السكروول
  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  // العودة لأعلى الصفحة
  const scrollToTop = () => {
    scroll.scrollToTop({
        duration: 500,      // ← المدة بالملي ثانية
        smooth: 'easeInOutQuart', // ← حركة ناعمة
      });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-17 right-6 z-50 bg-[#974e4e] hover:bg-[#966666] text-white p-3 rounded-full shadow-lg mb-6"
          aria-label="العودة للأعلى"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
