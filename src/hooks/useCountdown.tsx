import { useEffect, useState } from "react";

export function useCountdown(deadline?: string | null) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!deadline) {
      setTimeLeft(0);
      return;
    }

    const deadlineTime = new Date(deadline).getTime();

    const updateTimeLeft = () => {
      const difference = deadlineTime - Date.now();

      setTimeLeft(Math.max(difference, 0));

      return difference <= 0;
    };

    const isExpired = updateTimeLeft();

    if (isExpired) {
      return;
    }

    const interval = setInterval(() => {
      const isExpired = updateTimeLeft();

      if (isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  return {
    timeLeft,
    formattedTime,
    isExpired: timeLeft === 0,
  };
}