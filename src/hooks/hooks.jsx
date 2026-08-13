import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
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

export const useScrollbar = () => {
  let scrollbarRef = useRef(null);

  useEffect(() => {
    scrollbarRef.current = OverlayScrollbars(document.body, {
      scrollbars: {
        autoHide: "move",
        autoHideDelay: 100,
      },
    });

    return () => {
      scrollbarRef.current?.destroy();
    };
  }, []);

  const setScrollEnabled = (enabled) => {
    scrollbarRef.current?.options({
      overflow: {
        x: enabled ? "scroll" : "hidden",
        y: enabled ? "scroll" : "hidden",
      },
    });
  };
  return { scrollbarRef, setScrollEnabled };
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    let localCard = localStorage.getItem(key);

    if (localCard != null) return JSON.parse(localCard);
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
