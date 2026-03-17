import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from './MusicPlayer';
import CallButton from './CallButton';

const HyperRoom = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Energy Orb Generator
  useEffect(() => {
    const spawnOrb = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const newOrb = {
        id,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 40 + 20,
        color: Math.random() > 0.5 ? '#ff00ff' : '#00ffff',
        duration: Math.random() * 2 + 1,
      };
      setParticles(prev => [...prev.slice(-15), newOrb]);
    };

    const interval = setInterval(spawnOrb, 800);
    return () => clearInterval(interval);
  }, []);

  const handleCollect = (id) => {
    setScore(prev => prev + 10 * multiplier);
    setParticles(prev => prev.filter(p => p.id !== id));
    setMultiplier(prev => Math.min(prev + 0.1, 5));
  };

  return (
    <div className="hyper-wrapper" ref={containerRef}>
      {/* Dynamic Background Noise/Glow */}
      <div className="bg-vignette"></div>
      <div className="bg-glow-pulse"></div>

      <button className="back-btn" onClick={onBack}>
        <span className="arrow">←</span>
        <span className="btn-text">Seek the Peace</span>
      </button>

      <div className="hud">
        <div className="score-box">
          <span className="label">VIBE ENERGY</span>
          <span className="value">{Math.floor(score)}</span>
        </div>
        <div className="multiplier-box">
          <span className="value">x{multiplier.toFixed(1)}</span>
        </div>
      </div>

      <div className="main-content">
        <div className="title-container">
          <h1 className="glitch-text" data-text="HYPER">HYPER</h1>
          <p className="subtitle">Loud as fire. Feed the Chaos.</p>
          <div className="creator-credit">This chaos was hand-delivered by <span className="glow-name">Vetri</span>'s last two brain cells.</div>
        </div>

        <div className="game-area">
          {particles.map(p => (
            <div
              key={p.id}
              className="energy-orb"
              onMouseEnter={() => handleCollect(p.id)}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 40px ${p.color}, 0 0 80px ${p.color}44`,
                animationDuration: `${p.duration}s`
              }}
            >
              <div className="orb-inner"></div>
            </div>
          ))}
        </div>
      </div>

      <MusicPlayer
        url="/Ennamo Yeadho.mp3"
        theme="hyper"
      />

      <CallButton theme="hyper" phoneNumber="+918754089051" />

      <style jsx>{`
        .hyper-wrapper {
          height: 100vh;
          width: 100vw;
          background: #050005;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syncopate', sans-serif;
          cursor: crosshair;
        }

        .bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .bg-glow-pulse {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.05) 0%, transparent 70%);
          animation: pulseGlow 4s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        .back-btn {
          position: absolute;
          top: 40px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 0, 255, 0.05);
          border: 1px solid rgba(255, 0, 255, 0.2);
          padding: 12px 24px;
          border-radius: 4px;
          color: rgba(255, 0, 255, 0.6);
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 2px;
          transition: all 0.3s;
          z-index: 100;
          cursor: pointer;
        }

        .back-btn:hover {
          background: rgba(255, 0, 255, 0.15);
          border-color: #ff00ff;
          color: #ff00ff;
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
          transform: skewX(-5deg);
        }

        .hud {
          position: absolute;
          top: 40px;
          right: 40px;
          display: flex;
          gap: 30px;
          z-index: 50;
        }

        .score-box, .multiplier-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .label {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 3px;
        }

        .value {
          font-size: 1.8rem;
          color: white;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .multiplier-box .value {
          color: #00ffff;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .main-content {
          z-index: 10;
          text-align: center;
          pointer-events: none;
        }

        .title-container {
          margin-bottom: 2rem;
        }

        .glitch-text {
          font-size: 8rem;
          color: white;
          position: relative;
          margin: 0;
          line-height: 1;
        }

        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff00ff;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 #00ffff;
          animation: glitch-anim2 3s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(20px, 9999px, 40px, 0); }
          100% { clip: rect(80px, 9999px, 100px, 0); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(10px, 9999px, 30px, 0); }
          100% { clip: rect(50px, 9999px, 70px, 0); }
        }

        .subtitle {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 8px;
          text-transform: uppercase;
        }

        .game-area {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        .energy-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: orbPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transition: transform 0.2s, opacity 0.3s;
        }

        .creator-credit {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: rgba(255, 0, 255, 0.6);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .glow-name {
          color: #fff;
          font-weight: 700;
          text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px var(--neon-pink);
          animation: hyperNameGlow 2s ease-in-out infinite alternate;
        }

        @keyframes hyperNameGlow {
          from { text-shadow: 0 0 10px #fff, 0 0 20px #fff; }
          to { text-shadow: 0 0 20px #fff, 0 0 30px var(--neon-pink), 0 0 40px var(--neon-pink); }
        }

        .energy-orb:hover {
          transform: scale(0);
          opacity: 0;
        }

        .orb-inner {
          width: 40%;
          height: 40%;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 20px white;
        }

        @keyframes orbPop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .back-btn {
            top: 20px;
            left: 20px;
            padding: 8px 16px;
            font-size: 0.7rem;
          }
          .hud {
            top: 20px;
            right: 20px;
            gap: 15px;
          }
          .value {
            font-size: 1.2rem;
          }
          .glitch-text {
            font-size: 3.5rem;
          }
          .subtitle {
            font-size: 0.65rem;
            letter-spacing: 3px;
          }
          .creator-credit {
            font-size: 0.65rem;
            margin-top: 0.5rem;
            padding: 0 20px;
          }
          .title-container {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HyperRoom;
