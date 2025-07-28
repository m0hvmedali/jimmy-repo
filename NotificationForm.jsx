// src/NotificationForm.jsx
import { useState } from 'react';

const NotificationForm = ({ notification, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: notification?.title || '',
    type: notification?.type || 'Push Notification',
    days: notification?.days || 1,
    message: notification?.message || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="text-[#b89d9e] text-sm block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-[#382929] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9242a]"
            placeholder="Notification title"
            required
          />
        </div>
        
        <div>
          <label className="text-[#b89d9e] text-sm block mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#382929] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9242a]"
          >
            <option value="Push Notification">Push Notification</option>
            <option value="In-App Message">In-App Message</option>
          </select>
        </div>
        
        <div>
          <label className="text-[#b89d9e] text-sm block mb-1">
            Days until notification
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              name="days"
              min="1"
              max="30"
              value={formData.days}
              onChange={handleChange}
              className="flex-1"
            />
            <span className="text-white w-10 text-center">{formData.days}</span>
          </div>
        </div>
        
        <div>
          <label className="text-[#b89d9e] text-sm block mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full bg-[#382929] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9242a]"
            placeholder="Notification message content"
            required
          />
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-[#382929] text-white rounded-lg py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#e9242a] text-white rounded-lg py-2"
        >
          {notification ? 'Update' : 'Add'} Notification
        </button>
      </div>
    </form>
  );
};

export default NotificationForm;