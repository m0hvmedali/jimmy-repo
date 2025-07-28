import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import { 
  MessageCircle, 
  Smile, 
  BookOpen, 
  Heart, 
  User,
  Settings,
  Bell,
  ChevronDown,
  ArrowRight,
  MapPin,
  Box
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import WelcomePopup from './message';
const Home = () => {
  const [showHearts, setShowHearts] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate()
  
  // إخفاء انفجار القلوب بعد 5 ثواني
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHearts(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // بيانات الإشعارات
  const notifications = [
    {
      id: 1,
      title: "رسالة جديدة من جيمي",
      content: "أتمنى لكِ يوماً رائعاً يا حبيبتي، أنا أفكر فيكِ طوال الوقت",
      time: "منذ 5 دقائق",
      icon: <Heart className="text-pink-500" size={16} />
    },
    {
      id: 2,
      title: "ذكرى جديدة",
      content: "لقد أضاف جيمي ذكرى جديدة لرحلة الشاطئ",
      time: "منذ ساعتين",
      icon: <BookOpen className="text-blue-500" size={16} />
    },
    {
      id: 3,
      title: "رسالة يومية",
      content: "لم تقومي بإرسال رسالتك اليومية بعد",
      time: "منذ 4 ساعات",
      icon: <MessageCircle className="text-green-500" size={16} />
    }
  ];
  
  return (
    
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#330a0c] to-[#221112] justify-between overflow-hidden font-sans pb-10">
        
              <WelcomePopup />

    {/* Background hearts */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none ">
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

          <Heart size={30} />

        </motion.div>
      ))}
    </div>


      {/* انفجار القلوب */}
      {showHearts && (
  <div className="fixed inset-0 z-50 pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute animate-heart-pop-and-fall"
        style={{
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDelay: `${Math.random() * 1}s`,
          fontSize: `${Math.random() * 20 + 10}px`,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        }}
      >
        <Heart className="text-pink-500" size={16} />
      </div>
    ))}
  </div>
)}

      
      {/* المحتوى الرئيسي */}
      <div className="flex flex-col min-h-screen justify-between pb-5">
        <div>
          {/* شريط الرأس */}
          <div className="flex justify-between items-center p-4 border-b ">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r bg-pink-500  w-12 h-12 rounded-xl flex items-center justify-center">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h5 className="text-xl font-bold">Endless journey</h5>
                <p className="text-[#b4a2a2] text-sm">بنيته عشان عايز احافظ على كل ثانيه معاكي</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-[#362b2b] transition-colors"
              >
                <Bell className="text-[#b4a2a2]" size={20} />
                <span className="absolute top-1 right-1 bg-pink-600 w-2 h-2 rounded-full"></span>
              </button>
              
              <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-[#362b2b] transition-colors">
                <Settings className="text-[#b4a2a2]" size={20} />
              </button>
            </div>
          </div>
          
          {/* الإشعارات */}
         
<NotificationsPanel 
  showNotifications={showNotifications}
  setShowNotifications={setShowNotifications}
/>


          {/* المحتوى الرئيسي */}
          <div className="flex flex-col items-center p-4 mt-8">
            <div className="relative">
              <div 
                className="bg-gray-200 border-2  rounded-full w-32 h-32"
                style={{ backgroundImage: 'url("/book/download.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div className="absolute -bottom-2 -right-2 bg-pink-600 w-8 h-8 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold">Jimmy & Basmala</h2>
              <p className="text-[#b4a2a2] mt-1">Cherishing our memories together</p>
            </div>
            
            <p className="text-center mt-6 max-w-md text-[#b4a2a2]">
              Welcome to our shared space, a digital scrapbook of our journey together. Here, we'll capture the moments, big and small, that define us. From daily messages to heartfelt reflections, this is where our story unfolds.
            </p>
            
            <button onClick={() => navigate('/about')} className="mt-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
              Explore Adout Team .
              <ArrowRight size={18} />
            </button>
          </div>
          
          {/* بطاقات المحتوى */}
          <div className="grid grid-cols-2 gap-4 p-4 mt-8">
            <div className="bg-[#251e1e] rounded-xl p-4 flex flex-col items-center text-center">
              <div className="bg-pink-500/20 p-3 rounded-full mb-3">
                <MapPin className="text-pink-500" size={24} onClick={() => navigate('/location')} />
              </div>
              
              <h3 className="font-bold">Location tracker</h3>

              <p onClick={() => navigate('/location')} className="text-[#b4a2a2] text-sm mt-1 cursor-pointer hover:text-white transition-colors"> هنا نقدر نعرف مكان بعض </p>
            </div>
            
            <div className="bg-[#251e1e] rounded-xl p-4 flex flex-col items-center text-center">
              <div className="bg-blue-500/20 p-3 rounded-full mb-3">
                <BookOpen className="text-blue-500" size={24} onClick={() => navigate('/album')} />
              </div>
              
              <h3 className="font-bold">Album</h3>
              <p onClick={() => navigate('/album')} className="text-[#b4a2a2] text-sm mt-1 cursor-pointer hover:text-white transition-colors">كل فيلم ومسلسل واغنيه وكتاب بتحبيهم انا فاكرهم </p>
            </div>
            
            <div className="bg-[#251e1e] rounded-xl p-4 flex flex-col items-center text-center">
              <div className="bg-purple-500/20 p-3 rounded-full mb-3">
                <Heart className="text-purple-500" size={24} />
              </div>
              <h3 className="font-bold">Meories</h3>
              <p onClick={() => navigate('/memories')} className="text-[#b4a2a2] text-sm mt-1 cursor-pointer hover:text-white transition-colors">هنا عشت اجمل ايام حياتي</p>
            </div>
            
            <div className="bg-[#251e1e] rounded-xl p-4 flex flex-col items-center text-center">
              <div className="bg-yellow-500/20 p-3 rounded-full mb-3">
                <Box className="text-yellow-500" size={24} />
              </div>
              <h3 className="font-bold">Box Module</h3>
              <p onClick={() => navigate('/box')} className="text-[#b4a2a2] text-sm mt-1 cursor-pointer hover:text-white transition-colors">ما يسعدك ويجعل يومك أجمل</p>
            </div>
          </div>
        </div>
        
        
      </div>

      {/* قائمة التنقل */}
      <BottomNav  />
    </div>
  );
};

// مكون عنصر التنقل

function NotificationsPanel({ showNotifications, setShowNotifications }) {
    const { notifications } = useNotifications();
  
    return (
      showNotifications && (
        <div className="bg-[#251e1e] shadow-lg mx-4 mt-2 rounded-xl p-4 absolute right-0 left-0 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">الإشعارات</h3>
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-[#b4a2a2] hover:text-white"
            >
              <ChevronDown size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            {notifications.length === 0 && (
              <p className="text-center text-sm text-[#b4a2a2]">لا توجد إشعارات بعد</p>
            )}
            {notifications.map(notif => (
              <div key={notif.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#362b2b] transition-colors">
                <div className="bg-[#362b2b] p-2 rounded-full">
                  {notif.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-[#b4a2a2]">{notif.content}</p>
                  <p className="text-xs text-[#b4a2a2] mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    );
  }

export default Home;