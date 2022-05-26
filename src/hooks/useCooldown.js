import { useState, useEffect } from "react";

export function useCooldown() {
  const [progress, setProgress] = useState(101);

  function saveLocalStorage() {
    const data = new Date();
    data.setSeconds(data.getSeconds() + 50);
    localStorage.setItem("cooldown", data);
  }

  function verifyData() {
    const data = localStorage.getItem("cooldown");

    if (new Date() < new Date(data)) {
      const oldTime = new Date().getTime() / 1000;
      const newTime = new Date(data).getTime() / 1000;
      setProgress(parseInt(newTime - oldTime )* 2);
    }
  }
  useEffect(() => {
    verifyData();
  }, []);

  useEffect(() => {
    if (progress <= 100) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress - 2 < 0) {
            return 101;
          }
          const diff = 2;
          return Math.max(oldProgress - diff, 0);
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress]);
  return [progress, setProgress, saveLocalStorage];
}
