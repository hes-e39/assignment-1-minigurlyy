import React, { useState, useEffect } from 'react';

const XY: React.FC = () => {
  const initialTimePerRound = 60;
  const totalRounds = 10;

  // remaining time in current round
  const [time, setTime] = useState(initialTimePerRound);
  // current round
  const [round, setRound] = useState(1);
  // timer is running
  const [isRunning, setIsRunning] = useState(false);

 // useEffect handle timer interval when timer is running
  useEffect(() => {
    if (isRunning && time > 0) {
      // decrement time by 1 sec
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (isRunning && time === 0) {
      if (round < totalRounds) {
        setTime(initialTimePerRound); // next round timer reset
        setRound(prevRound => prevRound + 1); // move to next round
      } else {
        setIsRunning(false);
      }
    }
  }, [isRunning, time, round]);

  // Below Functions: start/resume, pause, reset, fast forward timer
  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTimePerRound);
    setRound(1);
  };

  const handleFastForward = () => {
    setIsRunning(false);
    setTime(0);
    setRound(totalRounds);
  };

  return (
    <div>
      <div className="timer-round">Round {round}/{totalRounds}</div>
      <div className="timer-time">
        {Math.floor(time / 60).toString().padStart(2, '0')}:
        {(time % 60).toString().padStart(2, '0')}
      </div>
      <button onClick={handleStart} disabled={isRunning || round > totalRounds} className="timer-button start-button">
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

export default XY;
