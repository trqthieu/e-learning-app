import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const CountdownTimer = ({ initialSeconds, onCountdownEnd }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Timer is complete
      setIsActive(false);
      clearInterval(interval);
      if (onCountdownEnd) {
        onCountdownEnd();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, onCountdownEnd]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <Text>{formatTime(seconds)}</Text>;
};

export default CountdownTimer;
