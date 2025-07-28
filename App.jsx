// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DailyMessagesPage from './pages/DailyMessagesPage.jsx';
import LocationTrackerPage from './pages/LocationTrackerPage.jsx';
import Album from './pages/Album.jsx';
import MemoriesPage from './pages/Memories.jsx';
import Box from './pages/Box.jsx';
import AffectionPage from './pages/AffectionPage.jsx';
import Footer from './pages/About.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
export default function App() {

  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/daily" element={<DailyMessagesPage />} />
            <Route path="/location" element={<LocationTrackerPage />} />
            <Route path="/album" element={<Album />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/box" element={<Box />} />
            <Route path="/affection" element={<AffectionPage />} />
            <Route path="/about" element={<Footer />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notic" element={<NotificationPage />} />
          </Routes>
        </div>
      </Router>
      
    );
}
