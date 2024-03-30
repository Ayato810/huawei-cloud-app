import { RingProgress, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';

const Timer = ({ minutes, isPaused }: { minutes: number; isPaused: boolean }) => {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!isPaused) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalSeconds = minutes * 60;
  const progressValue = ((totalSeconds - seconds) / totalSeconds) * 100;

  return (
    <>
      <Text c="blue" fw={700} ta="center" size="xl">
        Elapsed Time
      </Text>
      <RingProgress
        sections={[{ value: progressValue, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            {formatTime(seconds)}
          </Text>
        }
      />
    </>
  );
};

export default Timer;
