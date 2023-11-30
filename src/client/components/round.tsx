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
  const { currentQuestion } = activityRunning;
  // Detect when we need to display the "Round Introduction" screen. This depends on the structure
  // of the questions in the activity, so that complexity has been pulled out into a hook.
  const displayIntroduction = useRoundIntro(activityRunning);
  if (displayIntroduction) {
    return (
      <Wrapper>
        <span className={activityName}>{activity.activity_name}</span>
        <span className={roundName}>{currentQuestion.round!.round_title}</span>
      </Wrapper>
    );
  } else {
    return (
      <Question
        activity={activity}
        question={currentQuestion.question}
        round={currentQuestion.round}
        answerQuestion={activityRunning.answerQuestion}
      />
    );
  }
}
