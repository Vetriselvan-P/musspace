import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import CallButton from './CallButton';

const QuietRoom = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="quiet-container">
      <button className="back-btn" onClick={onBack}>
        <span className="arrow">←</span>
        <span className="btn-text">Back to Home</span>
      </button>

      <div className="content">
        {!isActive ? (
          <div className="intro-screen fade-in">
            <h2 className="intro-title">Take a moment to just be.</h2>
            <p className="intro-subtitle">When you're ready, we'll find a rhythm together.</p>
            <div className="creator-credit"><span className="glow-name">Vetri</span> tried to be quiet once. It lasted 4 seconds.</div>
            <button className="action-btn" onClick={() => setIsActive(true)}>
              Start Breathing
            </button>
          </div>
        ) : (
          <div className="session-screen fade-in">
            <div className="breathing-zone">
              <div className="breathing-content anim-master">
                <div className="breath-circle"></div>
                <div className="breath-labels">
                  <span className="inhale">Inhale</span>
                  <span className="exhale">Exhale</span>
                </div>
              </div>
            </div>

            <div className="message-box">
              <h3 className="message-title">"It's okay to feel this way for no reason."</h3>
              <div className="narrative">
                <p>I know it's hard when you're suddenly quiet and depressed.</p>
                <p>You miss your older self — the jolly, hyper you.</p>
                <p className="accent-text">She's still there. This is just a temporary room.</p>
              </div>
              <p className="footer-text">Your hyper self is waiting for you. Take your time.</p>
              <div className="creator-credit"><span className="glow-name">Vetri</span> tried to be quiet once. It lasted 4 seconds.</div>
            </div>
          </div>
        )}
      </div>

      <MusicPlayer
        url="/Pala_Palakura_-_Hariharan.mp3"
        theme="quiet"
      />

      <CallButton theme="quiet" phoneNumber="+918754089051" />

      <style jsx>{`
        .quiet-container {
          height: 100vh;
          width: 100vw;
          background: radial-gradient(circle at center, rgba(15, 23, 42, 0.7) 0%, #020617 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          color: #94a3b8;
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
        }

        .back-btn {
          position: absolute;
          top: 40px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 24px;
          border-radius: 100px;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          z-index: 50;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 242, 255, 0.3);
          color: var(--soft-cyan);
          transform: translateY(-2px);
        }

        .content {
          width: 100%;
          max-width: 900px;
          text-align: center;
          z-index: 10;
        }

        .intro-screen h2 {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 3.5rem;
          color: white;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }

        .intro-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .action-btn {
          margin-top: 4rem;
          padding: 1.2rem 3.5rem;
          background: transparent;
          border: 1px solid var(--soft-cyan);
          color: var(--soft-cyan);
          border-radius: 100px;
          font-size: 1rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          font-weight: 600;
          transition: all 0.5s;
        }

        .action-btn:hover {
          background: var(--soft-cyan);
          color: #000;
          box-shadow: 0 0 50px rgba(0, 242, 255, 0.4);
        }

        .breathing-zone {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
          min-height: 420px;
        }

        .breathing-content {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .anim-master {
          animation: masterCycle 10s ease-in-out infinite;
        }

        @keyframes masterCycle {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        .breath-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(0, 242, 255, 0.3);
          background: radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%);
          box-shadow: 0 0 60px rgba(0, 242, 255, 0.1);
        }

        .breath-labels {
          position: relative;
          z-index: 20;
          color: white;
          text-transform: uppercase;
          font-weight: 200;
          font-size: 1.2rem;
          letter-spacing: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inhale, .exhale {
          position: absolute;
          white-space: nowrap;
          animation-duration: 10s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .inhale { animation-name: showInhale; }
        .exhale { animation-name: showExhale; }

        @keyframes showInhale {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes showExhale {
          0%, 50% { opacity: 0; }
          55%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }

        .message-title {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 2.2rem;
          color: white;
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .narrative {
          font-size: 1.2rem;
          line-height: 2.2;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
        }

        .accent-text {
          color: var(--soft-cyan);
          font-weight: 400;
          margin-top: 1rem;
        }

        .footer-text {
          font-size: 0.95rem;
          color: var(--soft-cyan);
          opacity: 0.7;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 0.5rem;
          font-weight: 300;
        }

        .creator-credit {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: rgba(0, 242, 255, 0.6);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .glow-name {
          color: #fff;
          font-weight: 700;
          text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px var(--soft-cyan);
          animation: quietNameGlow 2s ease-in-out infinite alternate;
        }

        @keyframes quietNameGlow {
          from { text-shadow: 0 0 10px #fff, 0 0 20px #fff; }
          to { text-shadow: 0 0 20px #fff, 0 0 30px var(--soft-cyan), 0 0 40px var(--soft-cyan); }
        }

        @media (max-width: 768px) {
          .back-btn {
            top: 20px;
            left: 20px;
            padding: 8px 16px;
            font-size: 0.8rem;
          }
          .intro-screen h2 {
            font-size: 2.2rem;
            padding: 0 20px;
          }
          .intro-subtitle {
            font-size: 0.9rem;
            padding: 0 30px;
          }
          .message-title {
            font-size: 1.4rem;
            padding: 0 20px;
            margin-bottom: 1rem;
          }
          .narrative {
            font-size: 0.9rem;
            padding: 0 20px;
            line-height: 1.6;
            margin-bottom: 0.5rem;
          }
          .breathing-zone {
            min-height: 250px;
            margin-bottom: 1rem;
          }
          .breathing-content {
            width: 160px;
            height: 160px;
          }
          .footer-text {
            font-size: 0.8rem;
            margin-top: 0;
          }
          .creator-credit {
            font-size: 0.7rem;
            margin-top: 0.5rem;
            padding: 0 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuietRoom;
