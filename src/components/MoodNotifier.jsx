import React from 'react';

const MoodNotifier = ({ message }) => {
  return (
    <div className="notification-bubble">
      <div className="icon">✨</div>
      <div className="text">{message}</div>
      <style jsx>{`
        .notification-bubble {
          position: fixed;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
          animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .icon {
          font-size: 1.2rem;
        }
        .text {
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
        }
        @keyframes slideDown {
          from { transform: translate(-50%, -100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MoodNotifier;
