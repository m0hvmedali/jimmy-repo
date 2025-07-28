// src/Album.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart,
  Smile,
  Notebook,
  User,
  Plus,
  Edit,
  X,
  Video,
  Music2,
  PlaySquareIcon,
  BookCopyIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import ScrollToTopButton from '../components/scrolup';
const Album = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [newItem, setNewItem] = useState({ title: '', imageUrl: '' });
  
  // بيانات المفضلات
  const [favorites, setFavorites] = useState({
    movies: [
      { 
        id: 1, 
        title: 'الخليه', 
        imageUrl: '/movies/ملصق_فيلم_الخلية_2017.jpg' 
      },
      { 
        id: 2, 
        title: 'بيبو و بشير ', 
        imageUrl: '/movies/ملصق_فيلم_بيبو_وبشير.jpg' 
      },
     
      
    ],
    songs: [
      { 
        id: 1, 
        title: 'شم الياسمين', 
        imageUrl: '/songs/download.webp' 
      },
      { 
        id: 2, 
        title: 'فاكره', 
        imageUrl: '/songs/download1.webp' 
      },
      { 
        id: 3, 
        title: 'يا احلى عيون', 
        imageUrl: '/songs/download2.webp' 
      } ,
      { 
        id: 4, 
        title: 'رغم المسافه', 
        imageUrl: '/songs/images.jfif' 
      }
    ],
    series: [
      { 
        id: 1, 
        title: 'سابع جار', 
        imageUrl: '/2/_315x420_a5e723e8e79b77bc444c329fc1d6b7df84a2b78dcb53ce886395a1066570790b.jpg' 
      },
      { 
        id: 2, 
        title: 'خلي بالك من زيزي ', 
        imageUrl: '/2/_315x420_f9be56df80b6c9ce456ba420aa06a917427de1a1c587516a7b2c954b389af573.jpg' 
      }
     
    ],
    books: [
      { 
        id: 1, 
        title: 'رسائل من القران', 
        imageUrl: '/book/Fn9oDIjWAAEHUcR.jpg' 
      }
      
    ]
  });

  // إضافة عنصر جديد
  const handleAddItem = () => {
    if (!newItem.title || !newItem.imageUrl) return;
    
    setFavorites(prev => ({
      ...prev,
      [currentCategory]: [
        ...prev[currentCategory],
        {
          id: Date.now(),
          title: newItem.title,
          imageUrl: newItem.imageUrl
        }
      ]
    }));
    
    setNewItem({ title: '', imageUrl: '' });
    setShowAddModal(false);
  };

  // حذف عنصر
  const handleDeleteItem = (category, id) => {
    setFavorites(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  // فتح نافذة إضافة عنصر
  const openAddModal = (category) => {
    setCurrentCategory(category);
    setShowAddModal(true);
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
          <Heart size={24}  />
        </motion.div>
      ))}
    </div>
      {/* شريط الرأس */}
      <div className="flex items-center bg-[#181111] p-4 pb-2 justify-between sticky top-0 z-10">
        <button className="text-white flex size-12 shrink-0 items-center">
          <ArrowLeft size={24} onClick={() => window.history.back()} />
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Favourites 
        </h2>
      </div>

      {/* قسم الأفلام */}
      <div className="relative">
        <div className="flex justify-between items-center px-4 pb-3 pt-5">
         <h1 className='font-bold text-lg '>أفلامنا </h1>  < Video  className='mr-85 text-red-400'  /> 
       

         
          <button 
            onClick={() => openAddModal('movies')}
            className="p-2 bg-[#382929] rounded-full hover:bg-[#4a3a3a] transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4">
          <div className="flex items-stretch gap-3">
            {favorites.movies.map((movie) => (
              <div key={movie.id} className="flex flex-col gap-4 min-w-[150px] relative group">
                <div className="relative">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${movie.imageUrl})` }}
                  ></div>
                 
                </div>
                <p className="text-white text-base font-medium leading-normal text-center">
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم الأغاني */}
      <div className="relative">
        <div className="flex justify-between items-center px-4 pb-3 pt-5">
        <h1 className='font-bold text-lg '> أغانينا </h1>  < Music2  className='mr-85 text-red-400'  /> 

          <button 
            onClick={() => openAddModal('songs')}
            className="p-2 bg-[#382929] rounded-full hover:bg-[#4a3a3a] transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4">
          <div className="flex items-stretch gap-3">
            {favorites.songs.map((song) => (
              <div key={song.id} className="flex flex-col gap-4 min-w-[150px] relative group">
                <div className="relative">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${song.imageUrl})` }}
                  ></div>
                 
                </div>
                <p className="text-white text-base font-medium leading-normal text-center">
                  {song.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم المسلسلات */}
      <div className="relative">
        <div className="flex justify-between items-center px-4 pb-3 pt-5">
        <h1 className='font-bold text-lg '> مسلسلاتنا </h1> 
         < PlaySquareIcon  className='mr-80 text-red-400' /> 

          <button 
            onClick={() => openAddModal('series')}
            className="p-2 bg-[#382929] rounded-full hover:bg-[#4a3a3a] transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4">
          <div className="flex items-stretch gap-3">
            {favorites.series.map((series) => (
              <div key={series.id} className="flex flex-col gap-4 min-w-[150px] relative group">
                <div className="relative">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl h-30 pb-24"
                    style={{ backgroundImage: `url(${series.imageUrl})` }}
                  ></div>
                  
                </div>
                <p className="text-white text-base font-medium leading-normal text-center">
                  {series.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم الكتب */}
      <div className="relative">
        <div className="flex justify-between items-center px-4 pb-3 pt-5">
        <h1 className='font-bold text-lg '> الكتب </h1> 
        < BookCopyIcon  className='mr-85 text-red-400' /> 
          <button 
            onClick={() => openAddModal('books')}
            className="p-2 bg-[#382929] rounded-full hover:bg-[#4a3a3a] transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4">
          <div className="flex items-stretch gap-3">
            {favorites.books.map((book) => (
              <div key={book.id} className="flex flex-col gap-4 min-w-[150px] relative group">
                <div className="relative">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${book.imageUrl})` }}
                  ></div>
                  
                </div>
                <p className="text-white text-base font-medium leading-normal text-center">
                  {book.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* شريط التنقل السفلي */}
    <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* نافذة إضافة عنصر جديد */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#382929] rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {currentCategory === 'movies' && 'إضافة فيلم جديد'}
                {currentCategory === 'songs' && 'إضافة أغنية جديدة'}
                {currentCategory === 'series' && 'إضافة مسلسل جديد'}
                {currentCategory === 'books' && 'إضافة كتاب جديد'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-[#4a3a3a]"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">الاسم</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full bg-[#4a3a3a] text-white px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="أدخل الاسم"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">رابط الصورة</label>
                <input
                  type="text"
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                  className="w-full bg-[#4a3a3a] text-white px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="أدخل رابط الصورة"
                />
              </div>
              
              <button
                onClick={handleAddItem}
                className="w-full bg-[#b89d9e] text-[#382929] font-bold py-3 rounded-lg hover:bg-[#d1b7b8] transition-colors"
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}
      < ScrollToTopButton  />
    </div>
  );
};

export default Album;