import { Activity as ApiActivity } from "../hooks/useApi";
import { Wrapper } from "./wrapper";
import { ActivityRunning } from "../hooks/useActivityProgress";
import { Question } from "./question";
import { useRoundIntro } from "../hooks/useRoundIntro";
import { activityName, roundName } from "./round.module.css";

export function Round({
  activity,
  activityRunning,
}: {
  activity: ApiActivity;
  activityRunning: ActivityRunning;
}) {
  const displayIntroduction = useRoundIntro(activityRunning);
  if (displayIntroduction) {
    return (
      <Wrapper>
        <span className={activityName}>{activity.activity_name}</span>
        <span className={roundName}>{activityRunning.round!.round_title}</span>
      </Wrapper>
    );
  } else {
    return (
      <Question
        activity={activity}
        question={activityRunning.question}
        round={activityRunning.round}
        answerQuestion={activityRunning.answerQuestion}
      />
    );
  }
}
