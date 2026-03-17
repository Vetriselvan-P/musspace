import React, { useState, useEffect } from 'react';

const VibeTracker = ({ onBack }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.details || data.error || `Status ${res.status}`);
      }

      if (data.history) {
        setHistory(data.history);
        setError(null);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
      setError(`Sync Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoStr) => {
    const date = new Date(isoStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + 
           date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="tracker-container fade-in">
      <button className="back-btn" onClick={onBack}>
        <span className="arrow">←</span>
        <span className="btn-text">Back to Space</span>
      </button>

      <div className="tracker-content">
        <div className="header">
          <h1 className="title">Vibe History</h1>
          <p className="subtitle">Every time she let you in.</p>
        </div>

        {loading ? (
          <div className="loading">Checking the pulse...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-state">No vibes recorded yet. Waiting for the first tap... ✨</div>
            ) : (
              history.map((entry) => (
                <div key={entry.id} className={`history-item ${entry.mood}`}>
                  <div className="mood-badge">{entry.mood === 'hyper' ? '🔥' : '☁️'}</div>
                  <div className="details">
                    <span className="mood-name">{entry.mood.toUpperCase()}</span>
                    <span className="timestamp">{formatDate(entry.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .tracker-container {
          min-height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 20px;
          background: #020617;
          overflow-y: auto;
        }

        .back-btn {
          position: absolute;
          top: 30px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 20px;
          border-radius: 100px;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s;
          z-index: 100;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .tracker-content {
          width: 100%;
          max-width: 500px;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 15px 20px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          animation: slideUp 0.5s ease-out forwards;
        }

        .mood-badge {
          font-size: 1.5rem;
        }

        .details {
          display: flex;
          flex-direction: column;
        }

        .mood-name {
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .timestamp {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .history-item.hyper { border-left: 4px solid var(--neon-pink); }
        .history-item.quiet { border-left: 4px solid var(--soft-cyan); }
        
        .history-item.hyper .mood-name { color: var(--neon-pink); }
        .history-item.quiet .mood-name { color: var(--soft-cyan); }

        .loading, .empty-state {
          text-align: center;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 4rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .back-btn {
            top: 20px;
            left: 20px;
            padding: 8px 16px;
            font-size: 0.8rem;
          }
          .title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VibeTracker;
