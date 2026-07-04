import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useScrollTo = (to) => {
  const Location = useLocation();
  useEffect(() => {
    if (location.hash === `#${to}`) {
      setTimeout(() => {
        document.getElementById(to)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [Location]);
};

export const useTimer = (initialTime = 120) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRuning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsRuning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setTime(initialTime);
    setIsRuning(true);
  };
  const stopTimer = () => {
    setIsRuning(false);
  };

  const restartTimer = () => {
    setTime(initialTime);
    setIsRuning(true);
  };

  return { time, restartTimer, startTimer, stopTimer };
};
