import React, { useState } from "react";
import styled from "styled-components";

interface ExportButtonProps {
  activityId: string;
  search?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ activityId, search }) => {
  const [clicked, setClicked] = useState(false);

  const handleExport = () => {
    setClicked(true); // Trigger animation
    const params = new URLSearchParams();
    if (activityId) params.append("activity_id", activityId);
    if (search) params.append("search", search);

    // Start download
    window.location.href = `/export-jobfair?${params.toString()}`;

    // Reset button after 1 second (adjust time to match animation)
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <StyledWrapper>
      <button
        onClick={handleExport}
        className={`download-btn pixel-corners ${clicked ? "clicked" : ""}`}
      >
        <div className="button-content">
          <div className="svg-container">
            <svg
              className="download-icon"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479 6.908l-4-4h3v-4h2v4h3l-4 4z" />
            </svg>
          </div>
          <div className="text-container">
            <div className="text">Export Data</div>
          </div>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .download-btn {
    height: 45px;
    width: 120px;
    cursor: pointer;
    background: #1e6e43;
    border: none;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }

  .button-content {
    transform: translateY(-45px);
    transition: all 250ms ease-in-out;
  }

  .svg-container,
  .text-container {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-container .text {
    font-size: 13px;
    color: #fff;
    font-weight: 600;
    opacity: 1;
    transition: opacity ease-in-out 250ms;
  }

  .download-icon {
    height: 25px;
    width: 25px;
    fill: #fff;
    opacity: 0;
    transition: opacity ease-in-out 250ms;
  }

  /* hover or clicked state for the button */
  .download-btn:hover .button-content,
  .download-btn.clicked .button-content {
    transform: translateY(0px);
  }

  .download-btn:hover .text,
  .download-btn.clicked .text {
    opacity: 0;
  }

  .download-btn:hover .download-icon,
  .download-btn.clicked .download-icon {
    opacity: 1;
  }

  .download-btn:focus .download-icon {
    animation: heartbeat 1.5s ease-in-out infinite both;
  }

  @keyframes heartbeat {
    0% { transform: scale(1); transform-origin: center center; }
    10% { transform: scale(0.91); }
    17% { transform: scale(0.98); }
    33% { transform: scale(0.87); }
    45% { transform: scale(1); }
  }
`;

export default ExportButton;
