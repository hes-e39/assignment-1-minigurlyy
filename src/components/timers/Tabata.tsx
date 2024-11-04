import React, { useState, useEffect } from 'react';

const Tabata: React.FC = () => {
  // deliverable eg: 20s work 10s rest with total 8 rounds
  const workDuration = 20;
  const restDuration = 10;
  const totalRounds = 8;

  // track remaining time in current interval
  const [time, setTime] = useState(workDuration);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && time > 0) {
      // decrement time by 1 sec
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (isRunning && time === 0) {
      // Switch between work/rest when:
      if (isWorkPeriod) {
        setIsWorkPeriod(false);
        setTime(restDuration);
      } else {
        setIsWorkPeriod(true);
        setRound(prevRound => prevRound + 1);
        setTime(workDuration);

        if (round >= totalRounds) {
          setIsRunning(false);
        }
      }
    }
  }, [isRunning, time, isWorkPeriod, round]);

// Below Functions: start/resume, pause, reset, fast forward timer
  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(workDuration);
    setIsWorkPeriod(true);
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
      <h2>{isWorkPeriod ? 'Work' : 'Rest'}</h2>
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

export default Tabata;