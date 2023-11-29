import { useEffect, useState } from "react";
import { ActivityRunning } from "./useActivityProgress";

export function useRoundIntro(activityRunning: ActivityRunning): boolean {
  const [isDismissed, setIsDismissed] = useState(!activityRunning.round);
  const [activeRound, setActiveRound] = useState(activityRunning.round);

  useEffect(() => {
    if (isDismissed) {
      return;
    }
    const timeout = setTimeout(() => setIsDismissed(true), 1000);
    return () => clearTimeout(timeout);
  }, [isDismissed]);

  useEffect(() => {
    setActiveRound(activityRunning.round);
    if (activityRunning.round) {
      setIsDismissed(false);
    }
  }, [activityRunning.round]);

  return activeRound != activityRunning.round || !isDismissed;
}
