import React, { useEffect, useState } from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const circleStyle = {
    '--circumference': circumference,
    '--progress': progress,
    '--color': color,
  };

  return (
    <div className="circular-progressbar">
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #add8e6; stop-opacity: 1" />
            <stop offset="100%" style="stop-color:rgb(254, 250, 250); stop-opacity: 1" />
          </linearGradient>
        </defs>
          <circle
          className="circle bg"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          style={circleStyle}
        />
          <circle
          className={`circle ${isAnimating ? 'animating' : ''}`}
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          style={circleStyle}
        />
      </svg>
      <div className="percentage">{percentage}%</div>
    </div>
  );
};

export default CircularProgressBar;
