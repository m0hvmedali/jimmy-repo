// src/NotificationPage.jsx
import { useState, useEffect } from 'react';
import NotificationForm from './NotificationForm';
import { ArrowLeft,  Edit2, Bell} from 'lucide-react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Jimmy's Birthday Reminder",
        type: "Push Notification",
        days: 1,
        message: "Don't forget to wish Jimmy a happy birthday tomorrow!"
      },
      {
        id: 2,
        title: "Basmala's Anniversary",
        type: "In-App Message",
        days: 3,
        message: "Your anniversary with Jimmy is coming up in 3 days!"
      },
      {
        id: 3,
        title: "Jimmy's Graduation",
        type: "Push Notification",
        days: 2,
        message: "Jimmy's graduation ceremony is in 2 days. Plan to attend!"
      },
      {
        id: 4,
        title: "Basmala's Promotion",
        type: "In-App Message",
        days: 5,
        message: "Congrats on your promotion celebration in 5 days!"
      }
    ];
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Simulate daily notification sending (would be handled by backend in production)
  useEffect(() => {
    const sendDailyNotifications = () => {
      // This would be handled by a backend service that runs daily
      console.log('Daily notifications sent:', notifications);
    };
    
    // For demo purposes, we'll log to console
    const interval = setInterval(() => {
      console.log('Checking for notifications to send...');
      sendDailyNotifications();
    }, 1000 * 60 * 60 * 24); // Check every 24 hours
    
    return () => clearInterval(interval);
  }, [notifications]);

  const addNotification = (notification) => {
    setNotifications([...notifications, {
      ...notification,
      id: Date.now(),
      days: parseInt(notification.days)
    }]);
    setIsFormOpen(false);
  };

  const updateNotification = (updatedNotification) => {
    setNotifications(notifications.map(notif => 
      notif.id === updatedNotification.id ? updatedNotification : notif
    ));
    setEditingNotification(null);
  };

  const deleteNotifications = () => {
    setNotifications(notifications.filter(
      notif => !selectedNotifications.includes(notif.id)
    ));
    setSelectedNotifications([]);
    setIsDeleteMode(false);
  };

  const toggleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(item => item !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#181111] justify-between overflow-x-hidden font-sans">
      <div>
        <div className="flex items-center bg-[#181111] p-4 pb-2 justify-between sticky top-0 z-10">
          <button className="text-white flex size-12 shrink-0 items-center">
            <ArrowLeft className="text-xl" onClick={() => window.history.back()} />
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Notification Control
          </h2>
        </div>
        
        <div className="space-y-1 pb-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`flex items-center gap-4 bg-[#181111] px-4 min-h-[72px] py-2 justify-between relative
                ${isDeleteMode ? 'cursor-pointer' : ''}
                ${selectedNotifications.includes(notification.id) ? 'bg-[#2c1a1a]' : ''}
              `}
              onClick={() => isDeleteMode && toggleSelectNotification(notification.id)}
            >
              {isDeleteMode && (
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full border-2 
                  ${selectedNotifications.includes(notification.id) 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-[#b89d9e]'}`}
                />
              )}
              
              <div className="flex flex-col justify-center flex-1 pl-6">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">
                  {notification.title}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[#b89d9e] text-sm font-normal leading-normal line-clamp-1">
                    {notification.type}
                  </p>
                  <span className="text-[#b89d9e]">•</span>
                  <p className="text-[#b89d9e] text-sm font-normal leading-normal line-clamp-1">
                    {notification.message}
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3">
                <p className="text-white text-base font-normal leading-normal">
                  {notification.days} day{notification.days !== 1 ? 's' : ''}
                </p>
                
                {!isDeleteMode && (
                  <button 
                    className="text-[#b89d9e] hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingNotification(notification);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit2 />
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="text-center py-10">
              <div className="bg-[#2c1a1a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-2xl text-[#b89d9e]" />
              </div>
              <p className="text-[#b89d9e]">No notifications added yet</p>
              <p className="text-[#b89d9e] text-sm mt-2">Click "Add New Notification" to create your first reminder</p>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
            {isDeleteMode ? (
              <>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e9242a] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full"
                  onClick={deleteNotifications}
                  disabled={selectedNotifications.length === 0}
                >
                  <span className="truncate">Delete Selected ({selectedNotifications.length})</span>
                </button>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#382929] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full"
                  onClick={() => setIsDeleteMode(false)}
                >
                  <span className="truncate">Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e9242a] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full"
                  onClick={() => {
                    setEditingNotification(null);
                    setIsFormOpen(true);
                  }}
                >
                  <span className="truncate">Add New Notification</span>
                </button>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#382929] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full"
                  onClick={() => setEditingNotification(null)}
                >
                  <span className="truncate">Modify Notification</span>
                </button>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#382929] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full"
                  onClick={() => setIsDeleteMode(true)}
                >
                  <span className="truncate">Delete Notification</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="h-5 bg-[#181111]"></div>
      </div>
      
      {/* Notification Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#221112] rounded-xl w-full max-w-md p-6">
            <h3 className="text-white text-xl font-bold mb-4">
              {editingNotification ? 'Edit Notification' : 'Add New Notification'}
            </h3>
            
            <NotificationForm 
              notification={editingNotification}
              onSave={editingNotification ? updateNotification : addNotification}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingNotification(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;