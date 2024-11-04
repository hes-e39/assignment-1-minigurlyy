import React, { useState, useEffect } from 'react';

const Stopwatch: React.FC = () => {
  // tracking time in secs
  const [time, setTime] = useState(0);
  // check if timer running
  const [isRunning, setIsRunning] = useState(false);

  // useEffect handle timer interval when timer is running
  useEffect(() => {
    // check if timer running
    if (isRunning) {
      // increment time by 1 sec
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // Below Functions: start/resume, pause, reset, fast forward timer
  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleFastForward = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
      <div className="timer-time">
        {Math.floor(time / 60).toString().padStart(2, '0')}:
        {(time % 60).toString().padStart(2, '0')}
      </div>
      <button onClick={handleStart} disabled={isRunning} className="timer-button start-button">
        Start
      </button>
      <button onClick={handlePause} disabled={!isRunning} className="timer-button pause-button">
        Pause
      </button>
      <button onClick={handleReset} className="timer-button reset-button">
        Reset
      </button>
      <button onClick={handleFastForward} className="timer-button fast-forward-button">
        Fast Forward
      </button>
    </div>
  );
};

export default Stopwatch;
