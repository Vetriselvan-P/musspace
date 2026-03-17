import React, { useState } from 'react';
import Portal from './components/Portal';
import HyperRoom from './components/HyperRoom';
import QuietRoom from './components/QuietRoom';
import MoodNotifier from './components/MoodNotifier';
import VibeTracker from './components/VibeTracker';
import './index.css';

function App() {
  const [mode, setMode] = useState('none'); // 'none', 'hyper', 'quiet'
  const [notification, setNotification] = useState(null);
  const [showTracker, setShowTracker] = useState(false);

  const handleSelectMood = async (selectedMode) => {
    setMode(selectedMode);
    setNotification(`Ping sent! You're feeling ${selectedMode} ✨`);
    
    // 1. Vibe Tracker Persistence (Vercel KV)
    saveMoodToTracker(selectedMode);

    // 2. Real-Time Discord Notification
    sendMoodNotification(selectedMode);
    
    // Auto-clear notification
    setTimeout(() => setNotification(null), 3000);
  };

  const saveMoodToTracker = async (mood) => {
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
      });
    } catch (err) {
      console.error("Failed to log mood to tracker:", err);
    }
  };

  const sendMoodNotification = async (mood) => {
    const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === "YOUR_DISCORD_WEBHOOK_URL_HERE") return;

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `✨ **New Mood Alert!** \nShe just entered the **${mood.toUpperCase()}** room.`,
          username: "Her Space Monitor"
        })
      });
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  };

  const handleBack = () => {
    setMode('none');
  };

  return (
    <div className={`app-container ${mode}`}>
      <div className="bg-mesh"></div>
      {notification && <MoodNotifier message={notification} />}
      
      {showTracker ? (
        <VibeTracker onBack={() => setShowTracker(false)} />
      ) : (
        <>
          {mode === 'none' && (
            <Portal 
              onSelect={handleSelectMood} 
              onShowTracker={() => setShowTracker(true)} 
            />
          )}

          {mode === 'hyper' && (
            <HyperRoom onBack={handleBack} />
          )}

          {mode === 'quiet' && (
            <QuietRoom onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
