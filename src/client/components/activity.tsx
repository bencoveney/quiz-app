import { useActivityProgress } from "../hooks/useActivityProgress";
import { Activity as ApiActivity } from "../hooks/useApi";
import { SaveResults } from "../hooks/useSavedResults";
import { Results } from "./results";
import { Round } from "./round";

export function Activity({
  activity,
  goHome,
  save,
}: {
  activity: ApiActivity;
  goHome: () => void;
  save: SaveResults;
}) {
  const activityProgress = useActivityProgress(activity, save);
  if (activityProgress.kind === "running") {
    return <Round activity={activity} activityRunning={activityProgress} />;
  }
  return (
    <Results
      goHome={goHome}
      results={activityProgress.results}
      activity={activity}
    />
  );
}
