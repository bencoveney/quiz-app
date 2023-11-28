import { useActivityProgress } from "../hooks/useActivityProgress";
import { Activity as ApiActivity } from "../hooks/useApi";
import { Question } from "./question";
import { Results } from "./results";

export function Activity({
  activity,
  goHome,
}: {
  activity: ApiActivity;
  goHome: () => void;
}) {
  const activityProgress = useActivityProgress(activity);
  if (activityProgress.kind === "running") {
    return (
      <Question
        activity={activity}
        question={activityProgress.question}
        round={activityProgress.round}
        answerQuestion={activityProgress.answerQuestion}
      />
    );
  }
  return <Results goHome={goHome} results={activityProgress.results} />;
}
