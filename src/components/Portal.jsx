import React from 'react';

const Portal = ({ onSelect }) => {
  return (
    <div className="portal-container">
      <div className="portal-intro slide-up">
        <h1 className="main-title">Which side of you is here today?</h1>
        <p className="subtitle">Tap the door that feels like *you* right now.</p>
        <div className="creator-credit">Blame <span className="glow-name">Vetri</span> for everything you see here.</div>
      </div>

      <div className="selection-area">
        <div 
          className="mode-card hyper-card" 
          onClick={() => onSelect('hyper')}
        >
          <div className="card-glass">
            <span className="card-label">Hyper</span>
            <div className="card-visual hyper-visual"></div>
            <p className="card-desc">For when you're the talkative, jolly version of yourself.</p>
          </div>
        </div>
        
        <div 
          className="mode-card quiet-card" 
          onClick={() => onSelect('quiet')}
        >
          <div className="card-glass">
            <span className="card-label">Quiet & Depressed</span>
            <div className="card-visual quiet-visual"></div>
            <p className="card-desc">For when the noise fades and you just need a place to be.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 2rem;
        }
        .portal-intro {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 3.5rem;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #fff, rgba(255,255,255,0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        .selection-area {
          display: flex;
          gap: 3rem;
          width: 100%;
          max-width: 1000px;
          justify-content: center;
        }
        .mode-card {
          flex: 1;
          height: 400px;
          cursor: pointer;
          position: relative;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .mode-card:hover {
          transform: translateY(-20px);
        }
        .card-glass {
          height: 100%;
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          transition: border 0.3s;
        }
        .mode-card:hover .card-glass {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .card-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1.8rem;
          text-transform: uppercase;
          letter-spacing: 5px;
          margin-bottom: 1rem;
          display: block;
          transition: all 0.3s;
        }
        .hyper-card .card-label {
          color: var(--neon-pink);
          text-shadow: 0 0 20px rgba(255, 45, 117, 0.4);
        }
        .quiet-card .card-label {
          color: var(--soft-cyan);
          text-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
        }
        .card-visual {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.5;
          transition: all 0.5s;
        }
        .hyper-visual { background: var(--neon-pink); }
        .quiet-visual { background: var(--soft-cyan); }
        .mode-card:hover .card-visual {
          transform: scale(1.5);
          opacity: 0.8;
          filter: blur(30px);
        }
        .card-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.6;
        }
        .creator-credit {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .glow-name {
          color: #fff;
          font-weight: 700;
          text-shadow: 0 0 10px #fff, 0 0 20px #fff;
          animation: nameGlow 2s ease-in-out infinite alternate;
        }
        @keyframes nameGlow {
          from { text-shadow: 0 0 10px #fff, 0 0 20px #fff; }
          to { text-shadow: 0 0 20px #fff, 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6); }
        }

        @media (max-width: 768px) {
          .portal-container {
            padding: 1.5rem;
            justify-content: flex-start;
            overflow-y: auto;
            height: auto;
            min-height: 100%;
          }
          .portal-intro {
            margin-bottom: 1.5rem;
            margin-top: 1rem;
          }
          .main-title {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            font-size: 0.8rem;
            letter-spacing: 1px;
          }
          .selection-area {
            flex-direction: column;
            gap: 1rem;
          }
          .mode-card {
            height: auto;
            min-height: 220px;
          }
          .card-glass {
            padding: 1.5rem 1rem;
          }
          .card-label {
            font-size: 1.2rem;
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
          }
          .card-visual {
            width: 60px;
            height: 60px;
            margin: 0.5rem 0;
          }
          .card-desc {
            font-size: 0.8rem;
            line-height: 1.4;
          }
          .creator-credit {
            font-size: 0.7rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Portal;
