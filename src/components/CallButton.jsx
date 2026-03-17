import React from 'react';

const CallButton = ({ theme, phoneNumber = import.meta.env.VITE_CONTACT_PHONE || "+1234567890" }) => {
  const isHyper = theme === 'hyper';
  
  return (
    <div className={`call-button-wrapper ${theme}`}>
      <a href={`tel:${phoneNumber}`} className="call-link">
        <div className="call-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
          </svg>
        </div>
        <span className="call-text">
          {isHyper ? "ENERGY CALL" : "SHARE THE SILENCE"}
        </span>
      </a>

      <style jsx>{`
        .call-button-wrapper {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 1000;
        }

        .call-link {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .call-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .call-text {
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 700;
        }

        /* Hyper Theme */
        .hyper .call-link {
          border-color: rgba(255, 0, 255, 0.3);
        }
        .hyper .call-icon {
          color: #ff00ff;
        }
        .hyper .call-link:hover {
          background: rgba(255, 0, 255, 0.1);
          border-color: #ff00ff;
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
          transform: translateY(-5px);
        }

        /* Quiet Theme */
        .quiet .call-link {
          border-color: rgba(0, 242, 255, 0.2);
        }
        .quiet .call-icon {
          color: var(--soft-cyan);
        }
        .quiet .call-link:hover {
          background: rgba(0, 242, 255, 0.05);
          border-color: var(--soft-cyan);
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.2);
          transform: translateY(-5px);
        }

        @media (max-width: 768px) {
          .call-button-wrapper {
            bottom: unset;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: auto;
          }
          .call-link {
            padding: 6px 12px;
            gap: 8px;
          }
          .call-icon svg {
            width: 18px;
            height: 18px;
          }
          .call-text {
            font-size: 0.55rem;
            letter-spacing: 1px;
          }
          /* Override hover transform on mobile if needed */
          .call-link:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CallButton;
