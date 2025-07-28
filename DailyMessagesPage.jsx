import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  House, 
  Calendar, 
  Heart, 
  User,
  Smile,
  Frown,
  Meh,
  CheckSquare

} from 'lucide-react';
import { supabase } from '../supabase.js';
import BottomNav from '../components/BottomNav.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';
const DailyMessagesPage = () => {
  const [message, setMessage] = useState('');
  const [previousMessages, setPreviousMessages] = useState([]);
  const [showHearts, setShowHearts] = useState(true);
  const [sending, setSending] = useState(false);
  const [sentToday, setSentToday] = useState(false);
  const [userName, setUserName] = useState('');
  const textareaRef = useRef(null);
  const { addNotification } = useNotifications();
  useEffect(() => {
    const timer = setTimeout(() => setShowHearts(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('daily_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setPreviousMessages(data);
        const today = new Date().toISOString().split('T')[0];
        const todayMessage = data.find(msg => msg.date === today && msg.user_name === userName);
        setSentToday(!!todayMessage);
      }
    };

    fetchMessages();

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [userName]);

  const handleSendMessage = async () => {
    if (!message.trim() || sentToday || !userName) return;

    setSending(true);

    addNotification({
        title: "تم إرسال الرسالة اليومية",
        content: "تمت إضافة الرسالة بنجاح إلى الجدول الزمني.",
        icon: <CheckSquare className="text-green-400" />,
      });
    try {
      const { data, error } = await supabase
        .from('daily_messages')
        .insert([
          { 
            message: message.trim(),
            date: new Date().toISOString().split('T')[0],
            user_name: userName
          }
        ])
        .select();

      if (!error && data && data.length > 0) {
        setMessage('');
        setSentToday(true);

        setPreviousMessages([
          {
            id: data[0].id,
            message: message.trim(),
            date: new Date().toISOString().split('T')[0],
            user_name: userName,
            created_at: new Date().toISOString()
          },
          ...previousMessages
        ]);
      } else {
        console.error('Insert succeeded but data is empty:', error, data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const moodMessages = {
    happy: "بسمله العزيزه، يومكِ مشرق كشمسكِ، وحياتكِ جميله كضحكتكِ. أتمنى لكِ يوماً سعيداً مليئاً بالحب والفرح.",
    sad: "أعلم أنكِ تمرين بيوم صعب، ولكن تذكري أنكِ أقوى مما تتخيلين. أنا هنا دائماً من أجلكِ، فلا تترددي في طلب أي شيء تحتاجينه.",
    lonely: "أنتِ ليست وحدكِ أبداً. قلبي معكِ في كل لحظة، وفكري معكِ في كل خطوة. إذا احتجتِ إلى الحديث، فأنا هنا."
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#330a0c] to-[#221112] justify-between overflow-hidden font-sans pb-10">
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
      {showHearts && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute animate-heart-explosion"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`,
              }}
            >
              <Heart size={20} />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center bg-[#221112] p-4 pb-2 justify-between sticky top-0 z-10">
        <button 
          className="p-2 rounded-full hover:bg-[#472426] transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} className="text-white" />
        </button>

        <h2 className="text-white text-lg font-bold flex-1 text-center pr-3">
          الرسائل اليومية
        </h2>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col pb-20">
        <div className="bg-[#331a1b] mx-4 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-[#ea2832]" size={20} />
            <h3 className="text-white font-bold">شارك مشاعرك اليوم</h3>
          </div>
          <p className="text-[#c89295] text-sm">
            هذه مساحتك الخاصة لمشاركة مشاعرك مع بسملة. اكتب لها رسالة حب، شكر، أو أي شيء يجول بخاطرك اليوم.
          </p>
        </div>

        {/* كارت اختيار الاسم */}
        {!userName && (
          <div className="bg-[#331a1b] mx-4 rounded-xl p-4 mb-4">
            <h3 className="text-white font-bold mb-2">اختر اسمك</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setUserName('جيمي')}
                className="flex-1 bg-[#472426] text-white py-2 rounded-lg hover:bg-[#5a2a2b]"
              >
                جيمي
              </button>
              <button
                onClick={() => setUserName('بسمله')}
                className="flex-1 bg-[#472426] text-white py-2 rounded-lg hover:bg-[#5a2a2b]"
              >
                بسمله
              </button>
            </div>
          </div>
        )}

        <div className="px-4 mb-6">
          <div className="bg-[#472426] rounded-xl p-4">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              placeholder="اكتب رسالة لبسملة..."
              className="w-full bg-transparent text-white placeholder:text-[#c89295] focus:outline-none resize-none min-h-32 text-base"
              disabled={!userName || sentToday || sending}
            />

            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button onClick={() => setMessage(moodMessages.happy)} className="p-2 rounded-full hover:bg-[#331a1b]"><Smile className="text-yellow-400" size={20} /></button>
                <button onClick={() => setMessage(moodMessages.sad)} className="p-2 rounded-full hover:bg-[#331a1b]"><Frown className="text-blue-400" size={20} /></button>
                <button onClick={() => setMessage(moodMessages.lonely)} className="p-2 rounded-full hover:bg-[#331a1b]"><Meh className="text-gray-400" size={20} /></button>
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || sentToday || sending || !userName}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  sentToday ? 'bg-gray-600' : 
                  message.trim() ? 'bg-[#ea2832] hover:bg-[#d1252e]' : 'bg-[#ea2832]/50'
                } text-white font-medium transition-colors`}
              >
                {sending ? 'جاري الإرسال...' : sentToday ? 'تم الإرسال اليوم' : 'إرسال'}
                {!sentToday && !sending && <Send size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="px-4">
          <h2 className="text-white text-xl font-bold mb-4">الرسائل السابقة</h2>

          {previousMessages.length === 0 ? (
            <div className="text-center py-8 text-[#c89295]">
              <p>لا توجد رسائل سابقة بعد</p>
            </div>
          ) : (
            <div className="space-y-4">
              {previousMessages.map((msg) => (
                <div key={msg.id} className="flex items-end gap-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex-shrink-0" />
                  <div className="flex flex-col gap-1 items-start flex-1">
                    <p className="text-[#c89295] text-xs">
                      {msg.user_name || 'مجهول'} • {new Date(msg.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-base flex max-w-[360px] rounded-xl px-4 py-3 bg-[#472426] text-white">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};


export default DailyMessagesPage;
