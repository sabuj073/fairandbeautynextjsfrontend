'use client';

import { useEffect, useState, useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  fontSize: number;
  delay: number;
}

export default function SnowEffect() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch snow effect setting from API
    const fetchSnowSetting = async () => {
      try {
        const response = await fetch('/api/snow-effect');
        const data = await response.json();
        console.log('Snow effect API response:', data);
        setEnabled(data.snow_effect === true || data.snow_effect === 'true' || data.snow_effect === 1 || data.snow_effect === '1');
      } catch (error) {
        console.error('Failed to fetch snow effect setting:', error);
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSnowSetting();
  }, []);

  // Generate snowflakes only once
  const snowflakes = useMemo(() => {
    const flakes: Snowflake[] = [];
    const numberOfSnowflakes = 60;

    for (let i = 0; i < numberOfSnowflakes; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 5 + 8, // 8-13 seconds
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1
        fontSize: Math.random() * 12 + 8, // 8-20px
        delay: Math.random() * 10, // 0-10s delay
      });
    }
    return flakes;
  }, []);

  if (loading || !enabled) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-20px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0.3;
            }
          }
          .snowflake {
            position: absolute;
            color: #fff;
            text-shadow: 0 0 5px #fff, 0 0 10px #b3e0ff;
            user-select: none;
          }
        `}
      </style>
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 99999 }}
      >
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              top: '-20px',
              opacity: flake.opacity,
              fontSize: `${flake.fontSize}px`,
              animation: `snowfall ${flake.animationDuration}s linear ${flake.delay}s infinite`,
            }}
          >
            ❄
          </span>
        ))}
      </div>
    </>
  );
}
