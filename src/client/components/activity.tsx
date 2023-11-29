import { useCallback, useEffect, useState } from "react";
import {
  ActivityRunning,
  useActivityProgress,
} from "../hooks/useActivityProgress";
import { Activity as ApiActivity } from "../hooks/useApi";
import { Results } from "./results";
import { Round } from "./round";

export function Activity({
  activity,
  goHome,
}: {
  activity: ApiActivity;
  goHome: () => void;
}) {
  const activityProgress = useActivityProgress(activity);
  if (activityProgress.kind === "running") {
    return <Round activity={activity} activityRunning={activityProgress} />;
  }
  return <Results goHome={goHome} results={activityProgress.results} />;
}
