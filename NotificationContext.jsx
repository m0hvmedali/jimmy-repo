// context/NotificationContext.jsx
import { createContext, useContext, useState } from "react";
import { Bell } from "lucide-react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({ title, content, icon = <Bell />, time = new Date().toLocaleTimeString() }) => {
    setNotifications(prev => [
      {
        id: Date.now(),
        title,
        content,
        icon,
        time,
      },
      ...prev, // latest on top
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
