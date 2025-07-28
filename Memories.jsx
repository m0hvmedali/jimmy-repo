import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeftIcon } from 'lucide-react'
import BottomNav from '../components/BottomNav';
import ScrollToTopButton from '../components/scrolup';
// Example images array: each has src and category
const images = [
  // { src: '/basmala/ea123b99-1aad-496a-908c-011abf787b81.png', category: 'Basmala' },
  { src: '/basmala/eff5e1fa-ba9c-4071-88d7-4ea1693d762f.png', category: 'Basmala' },
  { src: '/basmala/ea123b99-1aad-496a-908c-011abf787b81.png', category: 'Basmala' },
  { src: '/basmala/d402c310-cc23-4801-9dc9-c82cddd2bc57.png', category: 'Basmala' },
  { src: '/basmala/d01f292e-a4aa-40cd-9ab4-f3faca5df771.png', category: 'Basmala' },
  { src: '/basmala/a84b0b91-61e2-4a2b-90a3-61f67e77c4fc.png', category: 'Basmala' },
  { src: '/basmala/a71a0e98-1201-441e-b401-a4b9df3867c4.png', category: 'Basmala' },
  { src: '/basmala/479c1d17-81eb-4b42-b0ad-7a596538c582.png', category: 'Basmala' },
  { src: '/basmala/46f41123-39b6-43ae-8e74-6fa87a0d6d09.png', category: 'Basmala' },
  { src: '/basmala/3eeda0dd-26c8-4268-9963-270aa248bfa9.png', category: 'Basmala' },
  { src: '/basmala/1f9368f0-0dcd-4f0c-900f-3a4fafa75811.png', category: 'Basmala' },
  { src: '/jimmy/0f6d692e-5326-4c23-bc59-157fd1a74d21.png', category: 'jimmy' },
  { src: '/jimmy/8573c08e-0789-4322-b777-22eda26983ab.png', category: 'jimmy' },
  { src: '/jimmy/c7a43c16-f025-4dc2-b469-f28001f50130.png', category: 'jimmy' },
  { src: '/screenshots/2b4de473-2c50-412c-8a14-3f90a2e7ca00.png', category: 'momoreis' },
  { src: '/screenshots/9a62bb63-b80d-48fb-8307-e42f08771c52.png', category: 'momoreis' },
  { src: '/screenshots/88ebe56d-6de2-460a-95e9-caccdac4636d.png', category: 'momoreis' },
  { src: '/screenshots/747c5019-a57b-4334-8d3f-505fb38cd1a9.png', category: 'momoreis' },
  { src: '/screenshots/832018a7-5d20-44fb-bab8-4a049e72c26b.png', category: 'momoreis' },
  { src: '/screenshots/a5f19978-f54c-4a9d-a487-e3b051e655d0.png', category: 'momoreis' },
  { src: '/screenshots/d595a14c-4dfa-4331-9461-8ee3fdcc7f8d.png', category: 'momoreis' },
  { src: '/screenshots/fee694b0-e20e-4fed-9a3c-104a2d93de66.png', category: 'momoreis' },
  { src: '/screenshots/e32d511e-1a03-4d4c-a9bf-5a0e060ad2bf.png', category: 'momoreis' },
  { src: '/screenshots/de9e5c96-8853-48f3-8dd9-96ae5a812c93.png', category: 'momoreis' },
  { src: '/old/5f54a671-0bd9-4097-bdb8-8345a882a9f4.png', category: 'old' },
  { src: '/old/9985efef-8986-47bb-a890-3ccf967a2c60.png', category: 'old' },
  { src: '/old/be3135c3-4362-4312-a4e9-febbf25378be.png', category: 'old' },
  { src: '/old/d6b23548-dc14-4b4b-acd8-2621385f4546.png', category: 'old' },
  { src: '/old/dcbfd6ef-8663-4068-bf8a-afaff81f25cd.png', category: 'old' },
  { src: '/old/e468c627-ec47-45da-9d9d-39cdac1ce8d4.png', category: 'old' },

  // ... more images
];

// Utility to group by category
function groupByCategory(list) {
  return list.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export default function GalleryPage() {
  const grouped = groupByCategory(images);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#330a0c] to-[#221112] justify-between overflow-hidden font-sans pb-10">
    {/* Background hearts */}
    <div className="overflow-hidden absolute inset-0 pointer-events-none">
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
            {/* Back button & title */}
            <header className="flex items-center bg-[#221112] p-4 justify-between">
<button onClick={() => window.history.back()} >
 < ArrowLeftIcon className="w-6 h-6" />
</button>
<h2 className="text-lg font-bold mr-23">Jimmy & Basmala</h2>
       
      </header>

      <main>
        {Object.entries(grouped).map(([category, imgs]) => (
          <div key={category} className="mt-12 w-s">
            {/* <h2 className="pb-2 mt-4 text-2xl font-bold border-b">{category}</h2> */}
            <div className="flex flex-col gap-6">
              {imgs.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden ml-10 rounded-2xl shadow-lg  w-70"
                >
                  <img
                    src={img.src}   
                    alt={`Image ${idx}`}
                    className="object-cover ml-10  w-s h-sm"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{category} Image #{idx + 1}</h3>
                    <p className="text-sm text-gray-600">A beautiful moment captured under the theme of {category.toLowerCase()}.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <ScrollToTopButton />
      <BottomNav />
    </div>
  );
}
