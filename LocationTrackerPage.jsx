import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Minus, 
  Navigation2,
  User,
  MapPin,
  X
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../supabase';
import BottomNav from '../components/BottomNav';

const LocationTrackerPage = () => {
  const [jimmyLocation, setJimmyLocation] = useState(null);
  const [basmalaLocation, setBasmalaLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingMessage, setTrackingMessage] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userIdentity, setUserIdentity] = useState(null); // 'jimmy' أو 'basmala'
  const [showIdentityModal, setShowIdentityModal] = useState(true);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const trackingTimeoutRef = useRef(null);
  const locationUpdateIntervalRef = useRef(null);
  
  // مراجع لحفظ أحدث مواقع المستخدمين
  const jimmyLocationRef = useRef(null);
  const basmalaLocationRef = useRef(null);

  // تحديث المراجع عند تغير المواقع
  useEffect(() => {
    jimmyLocationRef.current = jimmyLocation;
  }, [jimmyLocation]);

  useEffect(() => {
    basmalaLocationRef.current = basmalaLocation;
  }, [basmalaLocation]);

  // جلب المواقع الحالية من Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      
      try {
        // جلب موقع جيمي
        const { data: jimmyData } = await supabase
          .from('locations')
          .select('*')
          .eq('user_name', 'جيمي')
          .maybeSingle();          
        // جلب موقع بسملة
        const { data: basmalaData, error } = await supabase
  .from('locations')
  .select('*')
  .eq('user_name', 'بسملة') // العربي هنا كويس 
   .maybeSingle();
if (error) {
  console.error('خطأ في جلب بيانات بسملة:', error.message);
}

        
        setJimmyLocation(jimmyData);
        setBasmalaLocation(basmalaData);
        
        // تحديث الخريطة إذا كانت موجودة
        if (mapInstance.current) {
          updateMap(jimmyData, basmalaData);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocations();
    
    // الاشتراك في تحديثات الموقع في الوقت الحقيقي
    const locationsSubscription = supabase
      .channel('locations')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'locations' 
      }, (payload) => {
        if (payload.new.user_name === 'جيمي') {
          setJimmyLocation(payload.new);
          updateMap(payload.new, basmalaLocationRef.current);
        } else if (payload.new.user_name === 'بسملة') {
          setBasmalaLocation(payload.new);
          updateMap(jimmyLocationRef.current, payload.new);
        }
      })
      .subscribe();
    
    return () => {
      if (locationsSubscription) {
        supabase.removeChannel(locationsSubscription);
      }
      clearTimeout(trackingTimeoutRef.current);
      clearInterval(locationUpdateIntervalRef.current);
    };
  }, []);
  
  // تهيئة الخريطة عند تحميل الصفحة
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // إنشاء خريطة Leaflet
      const map = L.map(mapRef.current, {
        center: [30.0444, 31.2357], // القاهرة كمركز افتراضي
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });
      
      // إضافة طبقة الخريطة الداكنة
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
      
      mapInstance.current = map;
      
      // إضافة عناصر التحكم بالتكبير/التصغير
      L.control.zoom({
        position: 'topright'
      }).addTo(map);
      
      // تحديث الخريطة بالبيانات إذا كانت متوفرة
      if (jimmyLocation || basmalaLocation) {
        updateMap(jimmyLocation, basmalaLocation);
      }
    }
  }, [mapRef.current]);
  
  // تحديث الخريطة بالبيانات الجديدة
  const updateMap = (jimmyData, basmalaData) => {
    if (!mapInstance.current) return;
    
    const map = mapInstance.current;
    
    // تحديث أو إضافة علامة جيمي
    if (jimmyData && jimmyData.latitude && jimmyData.longitude) {
      const jimmyPos = [jimmyData.latitude, jimmyData.longitude];
      
      if (!markersRef.current.jimmy) {
        // إنشاء علامة جديدة لجيمي
        const jimmyIcon = L.divIcon({
          className: 'jimmy-marker',
          html: `<div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                     <circle cx="12" cy="7" r="4"></circle>
                   </svg>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        markersRef.current.jimmy = L.marker(jimmyPos, { icon: jimmyIcon })
          .addTo(map)
          .bindPopup('<div class="text-center">جيمي<br>يتم التتبع الآن</div>');
      } else {
        // تحديث موقع العلامة الحالية
        markersRef.current.jimmy.setLatLng(jimmyPos);
      }
    }
    
    // تحديث أو إضافة علامة بسملة
    if (basmalaData && basmalaData.latitude && basmalaData.longitude) {
      const basmalaPos = [basmalaData.latitude, basmalaData.longitude];
      
      if (!markersRef.current.basmala) {
        // إنشاء علامة جديدة لبسملة
        const basmalaIcon = L.divIcon({
          className: 'basmala-marker',
          html: `<div class="w-8 h-8 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                     <circle cx="12" cy="7" r="4"></circle>
                   </svg>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        markersRef.current.basmala = L.marker(basmalaPos, { icon: basmalaIcon })
          .addTo(map)
          .bindPopup('<div class="text-center">بسملة<br>يتم التتبع الآن</div>');
      } else {
        // تحديث موقع العلامة الحالية
        markersRef.current.basmala.setLatLng(basmalaPos);
      }
    }
    
    // تحديد طريقة عرض الخريطة بناءً على البيانات المتاحة
    const hasJimmy = jimmyData?.latitude && jimmyData?.longitude;
    const hasBasmala = basmalaData?.latitude && basmalaData?.longitude;

    if (hasJimmy && hasBasmala) {
      // عرض كلا الموقعين في نفس النافذة
      const bounds = L.latLngBounds(
        [jimmyData.latitude, jimmyData.longitude],
        [basmalaData.latitude, basmalaData.longitude]
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (hasJimmy) {
      // التركيز على موقع جيمي فقط
      map.flyTo([jimmyData.latitude, jimmyData.longitude], 15);
    } else if (hasBasmala) {
      // التركيز على موقع بسملة فقط
      map.flyTo([basmalaData.latitude, basmalaData.longitude], 15);
    }
  };
  
  // بدء التتبع مع رسالة تأكيد
  const startTracking = (user) => {
    setTrackingMessage(`يتم الآن تتبع موقع ${user}`);
    setShowTracking(true);
    
    // إخفاء الرسالة بعد 5 ثوانٍ
    clearTimeout(trackingTimeoutRef.current);
    trackingTimeoutRef.current = setTimeout(() => {
      setShowTracking(false);
    }, 5000);
  };
  
  // التكبير
  const zoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomIn();
    }
  };
  
  // التصغير
  const zoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomOut();
    }
  };
  
  // التمركز على كلا الموقعين
  const centerOnBoth = () => {
    if (mapInstance.current && jimmyLocation && basmalaLocation) {
      const jimmyPos = [jimmyLocation.latitude, jimmyLocation.longitude];
      const basmalaPos = [basmalaLocation.latitude, basmalaLocation.longitude];
      
      const bounds = L.latLngBounds(jimmyPos, basmalaPos);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };
  
  // حساب الوقت المنقضي منذ آخر تحديث
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'غير معروف';
    
    try {
      const updatedAt = new Date(dateString);
      const now = new Date();
      const diffSeconds = Math.floor((now - updatedAt) / 1000);
      
      if (diffSeconds < 60) {
        return `منذ ${diffSeconds} ثواني`;
      } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);
        return `منذ ${minutes} دقيقة`;
      } else if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600);
        return `منذ ${hours} ساعة`;
      } else {
        const days = Math.floor(diffSeconds / 86400);
        return `منذ ${days} يوم`;
      }
    } catch (error) {
      return 'غير معروف';
    }
  };

  // تحديد هوية المستخدم
  const setUserIdentityHandler = (identity) => {
    setUserIdentity(identity);
    setShowIdentityModal(false);
    
    // بدء تحديث الموقع للمستخدم المحدد
    startLocationTracking(identity);
  };

  // بدء تحديث الموقع للمستخدم المحدد
  const startLocationTracking = async (identity) => {
    // التحقق من صلاحيات الموقع
    if (!navigator.geolocation) {
      setTrackingMessage('متصفحك لا يدعم تحديد الموقع الجغرافي');
      setShowTracking(true);
      return;
    }

    setUpdatingLocation(true);
    setTrackingMessage(`يتم تحديث موقع ${identity === 'jimmy' ? 'جيمي' : 'بسملة'}`);
    setShowTracking(true);

    // الحصول على الموقع الحالي
    const updateLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        
            const { latitude, longitude } = position.coords;
            const updatedAt = new Date().toISOString();
        
            // بناء بيانات الموقع
            const locationData = {
              user_name: identity === 'jimmy' ? 'جيمي' : 'بسملة',
              latitude,
              longitude,
              updated_at: updatedAt,
            };
        
            // تحديث حالة التطبيق
            if (identity === 'jimmy') {
              setJimmyLocation(locationData);
            } else {
              setBasmalaLocation(locationData);
            }
        
            // تسجيل البيانات قبل الإرسال
            console.log("📍 بيانات يتم إرسالها لـ Supabase:", locationData);
        
            // تحديث أو إدخال البيانات في قاعدة البيانات
            const { data, error } = await supabase
              .from('locations')
              .upsert(locationData, { onConflict: ['user_name'] }); // upsert لتحديث الصف حسب user_name
        
            if (error) {
              console.error('خطأ في تحديث الموقع:', error.message);
              setTrackingMessage(`حدث خطأ في تحديث الموقع: ${error.message}`);
            } else {
              setTrackingMessage(`تم تحديث موقع ${locationData.user_name}`);
            }
        
          } catch (error) {
            console.error('Error getting location:', error);
            setTrackingMessage(`حدث خطأ في تحديث الموقع: ${error.message}`);
            setLocationPermission('denied');
          }
        };
    
    // تحديث الموقع فورًا
    await updateLocation();
    
    // تحديث الموقع كل دقيقة (60000 مللي ثانية)
    clearInterval(locationUpdateIntervalRef.current);
    locationUpdateIntervalRef.current = setInterval(updateLocation, 60000);
  };

  // إيقاف تحديث الموقع
  const stopLocationTracking = () => {
    clearInterval(locationUpdateIntervalRef.current);
    setUpdatingLocation(false);
    setTrackingMessage('تم إيقاف تحديث الموقع');
    setShowTracking(true);
    setTimeout(() => setShowTracking(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  bg-[#221112] text-white font-sans overflow-hidden">
      {/* رسالة التتبع العائمة */}
      {showTracking && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-400 text-white px-6 py-3 rounded-xl shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <MapPin className="animate-bounce" />
            <span>{trackingMessage}</span>
          </div>
        </div>
      )}
      
      {/* نافذة تحديد الهوية */}
      {showIdentityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">من أنت؟</h3>
              <button 
                onClick={() => setShowIdentityModal(false)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              يرجى تحديد هويتك لتحديث موقعك الجغرافي على الخريطة
            </p>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setUserIdentityHandler('jimmy')}
                className="flex items-center gap-4 p-4 bg-blue-900 bg-opacity-50 rounded-xl hover:bg-blue-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold">جيمي</div>
                  <div className="text-sm text-gray-300">سأقوم بتحديث موقعي الحالي</div>
                </div>
              </button>
              
              <button
                onClick={() => setUserIdentityHandler('basmala')}
                className="flex items-center gap-4 p-4 bg-pink-900 bg-opacity-50 rounded-xl hover:bg-pink-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                  <User className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold">بسملة</div>
                  <div className="text-sm text-gray-300">سأقوم بتحديث موقعي الحالي</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* شريط الرأس */}
      <div className="flex items-center  p-4 justify-between sticky top-0 z-10 border-b border-gray-800">
        <button 
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        
        <h2 className="text-white text-xl font-bold flex-1 text-center">
          تتبع الموقع الجغرافي
        </h2>
        
        <div className="w-10"></div>
      </div>
      
      {/* محتوى الصفحة */}
      <div className="flex flex-col pb-20">
        {/* معلومات المستخدم */}
        {userIdentity && (
          <div className="p-4 bg-red-900 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  userIdentity === 'jimmy' ? 'bg-blue-500' : 'bg-pink-500'
                }`}>
                  <User className="text-white" />
                </div>
                <div>
                  <div className="font-bold">{userIdentity === 'jimmy' ? 'جيمي' : 'بسملة'}</div>
                  <div className="text-sm text-gray-400">
                    {updatingLocation ? 'يتم تحديث موقعك...' : 'موقعك غير محدث'}
                  </div>
                </div>
              </div>
              
              {updatingLocation ? (
                <button 
                  onClick={stopLocationTracking}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  إيقاف التحديث
                </button>
              ) : (
                <button 
                  onClick={() => startLocationTracking(userIdentity)}
                  className="px-4 py-2 bg-red-400 rounded-lg hover:bg-indigo-700"
                >
                  تحديث موقعي
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* شريط البحث */}
        <div className="px-4 py-3">
          <div className="flex w-full rounded-xl overflow-hidden0 border-gray-700 border-2">
            <div className="flex items-center justify-center p-3">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            //   placeholder="ابحث عن موقع..."
              className="flex-1 text-white px-2 py-3 focus:outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
        
        {/* الخريطة */}
        <div className="relative h-[320px] w-full">
          <div 
            ref={mapRef}
            className="h-full w-full z-0"
          />
          
          {/* عناصر تحكم الخريطة */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button 
              onClick={zoomIn}
              className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-80 flex items-center justify-center text-white shadow-lg hover:bg-indigo-600"
            >
              <Plus size={20} />
            </button>
            <button 
              onClick={zoomOut}
              className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-80 flex items-center justify-center text-white shadow-lg hover:bg-indigo-600"
            >
              <Minus size={20} />
            </button>
            <button 
              onClick={centerOnBoth}
              className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-80 flex items-center justify-center text-white shadow-lg hover:bg-indigo-600"
            >
              <Navigation2 size={20} />
            </button>
          </div>
        </div>
        
        {/* قائمة المستخدمين */}
        <div className="mt-6 px-4">
          <h3 className="text-lg font-bold mb-4 text-gray-300">المواقع الحالية</h3>
          
          <div 
            className="flex items-center gap-4 rounded-xl p-4 mb-4 cursor-pointer hover:bg-black transition-colors"
            onClick={() => {
              if (jimmyLocation) {
                startTracking('جيمي');
                mapInstance.current.flyTo(
                  [jimmyLocation.latitude, jimmyLocation.longitude], 
                  15
                );
                markersRef.current.jimmy?.openPopup();
              }
            }}
          >
            <div className="bg-blue-500 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <User className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">جيمي</p>
              {jimmyLocation ? (
                <p className="text-gray-400 text-sm">
                  آخر تحديث {getTimeAgo(jimmyLocation.updated_at)}
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  جاري تحميل الموقع...
                </p>
              )}
            </div>
            <div className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
              {jimmyLocation ? 'online' : 'busy'}
            </div>
          </div>
          <hr className=' border-0.5 w-60 ml-50 border-gray-600' />
          <div 
            className="flex items-center gap-4 rounded-xl p-4 cursor-pointer hover:bg-black transition-colors"
            onClick={() => {
              if (basmalaLocation) {
                startTracking('بسملة');
                mapInstance.current.flyTo(
                  [basmalaLocation.latitude, basmalaLocation.longitude], 
                  15
                );
                markersRef.current.basmala?.openPopup();
              }
            }}
          >
            <div className="bg-pink-500 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <User className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">بسملة</p>
              {basmalaLocation ? (
                <p className="text-gray-400 text-sm">
                  آخر تحديث {getTimeAgo(basmalaLocation.updated_at)}
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  جاري تحميل الموقع...
                </p>
              )}
            </div>
            <div className="text-xs bg-pink-900 text-pink-300 px-2 py-1 rounded">
              {basmalaLocation ? 'online' : 'busy'}
            </div>
          </div>
        </div>
        
        {/* معلومات التتبع */}
        <div className="mt-6 px-4 text-center text-gray-500 text-sm">
          <p>• بيتحدث كل دقيقه موقعكم ولو التاني مكنش فاتح السايت يبقا مفيش منه</p>
          <p>• اتاكد انك حددت اسمك صح الله يستركم في داتا بيز شغاله</p>
          <p>• لو الموقع طلع غلط دي سياسه جوجل انا كودي زي الفل </p>

          {userIdentity && (
            <p className="mt-3 text-indigo-400">
              أنت الآن تقوم بتحديث موقع {userIdentity === 'jimmy' ? 'جيمي' : 'بسملة'}
            </p>
          )}
        </div>
      </div>
      < BottomNav />
    </div>
  );
};

export default LocationTrackerPage;