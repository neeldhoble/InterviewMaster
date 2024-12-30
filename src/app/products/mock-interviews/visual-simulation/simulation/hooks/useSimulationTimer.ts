import { useState, useRef, useCallback } from 'react';

export const useSimulationTimer = (onTimeUp: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState('00:00');
  const [isRunning, setIsRunning] = useState(false);
  
  const timerInterval = useRef<NodeJS.Timeout>();
  const endTime = useRef<number>(0);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateTimer = useCallback(() => {
    if (!endTime.current) return;
    
    const remaining = endTime.current - Date.now();
    if (remaining <= 0) {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      setTimeRemaining('00:00');
      setIsRunning(false);
      onTimeUp();
    } else {
      setTimeRemaining(formatTime(remaining));
    }
  }, [onTimeUp]);

  const startTimer = (durationInMinutes: number) => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    
    endTime.current = Date.now() + (durationInMinutes * 60 * 1000);
    setIsRunning(true);
    updateTimer();
    timerInterval.current = setInterval(updateTimer, 1000);
  };

  const pauseTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (endTime.current) {
      setIsRunning(true);
      timerInterval.current = setInterval(updateTimer, 1000);
    }
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    endTime.current = 0;
    setTimeRemaining('00:00');
    setIsRunning(false);
  };

  return {
    timeRemaining,
    isRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  };
};
