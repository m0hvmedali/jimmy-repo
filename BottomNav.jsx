import React, { useRef } from "react";
import { Home, Heart, User, FileHeart, Settings, MessageCircleHeart } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // ✅ استخدم الراوتر

const icons = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "favorites", label: "Affection", icon: FileHeart, path: "/affection" },
  { id: "message", label: "Daily Message", icon: MessageCircleHeart, path: "/daily" },
  { id: "account", label: "Settings", icon: Settings, path: "/settings" },
];

export default function BottomNav() {
  const clickSound = useRef(null);
  const location = useLocation(); // ✅ نجيب المسار الحالي

  const handleClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return (
    <nav className="bg-[#3d2223] text-white fixed bottom-0 w-full z-50 rounded-t-2xl shadow-lg overflow-hidden">
      {/* صوت النقر */}
      <audio ref={clickSound} src="/songs/mixkit-modern-click-box-check-1120.wav" preload="auto" />

      {/* الأشكال الهندسية */}
      <div className="absolute inset-0 z-0">
        <GeometricShapes />
      </div>

      {/* الأيقونات */}
      <div className="relative z-10 flex justify-around items-center py-3">
        {icons.map(({ id, label, icon: Icon, path }) => (
          <Link
            key={id}
            to={path}
            onClick={handleClick}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ease-out 
              ${location.pathname === path ? "text-white scale-110 -translate-y-1" : "text-white/60"}`}
          >
            <Icon size={22} />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function GeometricShapes() {
  const shapes = [
    { type: "circle", left: "10%", delay: "0s" },
    { type: "square", left: "30%", delay: "2s" },
    { type: "circle", left: "50%", delay: "4s" },
    { type: "square", left: "70%", delay: "6s" },
    { type: "circle", left: "85%", delay: "8s" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute bottom-[-40px] w-6 h-6 bg-red-50 ${
            shape.type === "circle" ? "rounded-full" : ""
          } animate-float`}
          style={{
            left: shape.left,
            animationDelay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
