import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ url, theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`music-player-container ${theme}`}>
      <audio ref={audioRef} src={url} loop />
      <button className="play-toggle" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? (
          <div className="pause-icon">
            <span></span>
            <span></span>
          </div>
        ) : (
          <div className="play-icon"></div>
        )}
      </button>
      <div className="track-label">Song of the Day</div>

      <style jsx>{`
        .music-player-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 10px 20px;
          border-radius: 50px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .play-toggle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .play-icon {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 0 10px 18px;
          margin-left: 4px;
        }

        .pause-icon {
          display: flex;
          gap: 4px;
        }

        .pause-icon span {
          width: 5px;
          height: 18px;
          border-radius: 2px;
        }

        .track-label {
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.6;
          font-weight: 600;
        }

        /* Hyper Theme */
        .hyper .play-toggle {
          background: #ff00ff;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        }
        .hyper .play-icon {
          border-color: transparent transparent transparent white;
        }
        .hyper .pause-icon span {
          background: white;
        }
        .hyper:hover {
          border-color: #ff00ff;
          box-shadow: 0 0 40px rgba(255, 0, 255, 0.2);
        }

        /* Quiet Theme */
        .quiet .play-toggle {
          background: rgba(0, 242, 255, 0.1);
          border: 1px solid var(--soft-cyan);
        }
        .quiet .play-icon {
          border-color: transparent transparent transparent var(--soft-cyan);
        }
        .quiet .pause-icon span {
          background: var(--soft-cyan);
        }
        .quiet:hover {
          border-color: var(--soft-cyan);
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.2);
        }

        @media (max-width: 768px) {
          .music-player-container {
            bottom: 10px;
            right: 15px;
            left: 15px;
            padding: 6px 12px;
            justify-content: center;
          }
          .play-toggle {
            width: 32px;
            height: 32px;
          }
          .track-label {
            font-size: 0.55rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
