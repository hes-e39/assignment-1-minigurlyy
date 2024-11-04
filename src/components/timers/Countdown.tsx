import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  // track remaining time in sec
  const [time, setTime] = useState(150); // deliverable eg: starting from 2 min 30 sec
  const [isRunning, setIsRunning] = useState(false);

 // useEffect handle timer interval when timer is running
  useEffect(() => {
    if (isRunning && time > 0) {
      // decrement time by 1 sec
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (time === 0) {
      setIsRunning(false);
    }
  }, [isRunning, time]);

  // Below Functions: start/resume, pause, reset, fast forward timer
  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(150);
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
      <button onClick={handleStart} disabled={isRunning || time === 0} className="timer-button start-button">
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

export default Countdown;