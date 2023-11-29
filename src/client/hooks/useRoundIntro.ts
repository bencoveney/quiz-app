import { useEffect, useState } from "react";
import { ActivityRunning } from "./useActivityProgress";

export function useRoundIntro({ currentQuestion }: ActivityRunning): boolean {
  const [isDismissed, setIsDismissed] = useState(!currentQuestion.round);
  const [activeRound, setActiveRound] = useState(currentQuestion.round);

  useEffect(() => {
    if (isDismissed) {
      return;
    }
    const timeout = setTimeout(() => setIsDismissed(true), 1000);
    return () => clearTimeout(timeout);
  }, [isDismissed]);

  useEffect(() => {
    setActiveRound(currentQuestion.round);
    if (currentQuestion.round) {
      setIsDismissed(false);
    }
  }, [currentQuestion.round]);

  return activeRound != currentQuestion.round || !isDismissed;
}
