import { useCallback, useEffect, useState } from "react";
import {
  ActivityRunning,
  useActivityProgress,
} from "../hooks/useActivityProgress";
import { Activity as ApiActivity, Round } from "../hooks/useApi";
import { Question } from "./question";
import { Results } from "./results";
import { RoundIntroduction } from "./roundIntroduction";

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
      <RunningActivity activity={activity} activityRunning={activityProgress} />
    );
  }
  return <Results goHome={goHome} results={activityProgress.results} />;
}

function RunningActivity({
  activity,
  activityRunning,
}: {
  activity: ApiActivity;
  activityRunning: ActivityRunning;
}) {
  const [currentRound, setCurrentRound] = useState<Round | undefined>(
    activityRunning.round
  );
  const [displayRoundIntro, setDisplayRoundIntro] = useState<boolean>(
    !!currentRound
  );
  useEffect(() => {
    if (activityRunning.round !== currentRound) {
      setCurrentRound(activityRunning.round);
      if (activityRunning.round) {
        setDisplayRoundIntro(true);
      }
    }
  }, [activityRunning.round]);

  const dismissRoundIntro = useCallback(() => {
    setDisplayRoundIntro(false);
  }, [setDisplayRoundIntro]);

  if (displayRoundIntro || currentRound !== activityRunning.round) {
    return (
      <RoundIntroduction
        activity={activity}
        round={activityRunning.round}
        dismiss={dismissRoundIntro}
      />
    );
  }
  return (
    <Question
      activity={activity}
      question={activityRunning.question}
      round={activityRunning.round}
      answerQuestion={activityRunning.answerQuestion}
    />
  );
}
