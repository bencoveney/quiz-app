import { useEffect, useState } from "react";
import { ActivityRunning } from "./useActivityProgress";

const DISMISS_TIMEOUT_MS = 1000;

export function useRoundIntro({ currentQuestion }: ActivityRunning): boolean {
  const [isDismissed, setIsDismissed] = useState(!currentQuestion.round);
  const [activeRound, setActiveRound] = useState(currentQuestion.round);

  // When the "Round Introduction" screen is displayed, dismiss it after 1 second.
  useEffect(() => {
    if (isDismissed) {
      return;
    }
    const timeout = setTimeout(() => setIsDismissed(true), DISMISS_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [isDismissed]);

  // When the current question changes, if we move to a question that is part of a round, display
  // the "Round Introduction" screen.
  useEffect(() => {
    setActiveRound(currentQuestion.round);
    if (currentQuestion.round) {
      setIsDismissed(false);
    }
  }, [currentQuestion.round]);

  return activeRound != currentQuestion.round || !isDismissed;
}
