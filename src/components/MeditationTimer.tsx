import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface MeditationTimerProps {
  onSessionComplete: (duration: number) => void;
}

const MeditationTimer: React.FC<MeditationTimerProps> = ({ onSessionComplete }) => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onSessionComplete(duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, timeLeft, duration, onSessionComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (newDuration: number) => {
    setIsActive(false);
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
          />
          <circle
            className="text-indigo-600 progress-ring__circle stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (301.59 * progress) / 100}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-4xl font-bold text-indigo-600">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => resetTimer(60)}
        >
          1 min
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => resetTimer(300)}
        >
          5 min
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => resetTimer(600)}
        >
          10 min
        </button>
      </div>
      <button
        className="px-6 py-2 bg-indigo-600 text-white rounded flex items-center"
        onClick={toggleTimer}
      >
        {isActive ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default MeditationTimer;