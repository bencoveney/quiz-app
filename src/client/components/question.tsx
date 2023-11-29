import {
  Question as ApiQuestion,
  Activity as ApiActivity,
  Round as ApiRound,
} from "../hooks/useApi";
import { Button, ButtonBar } from "./button";
import { Wrapper } from "./wrapper";
import {
  questionTitle,
  activityName,
  questionNumber,
  stimulus,
} from "./question.module.css";

export type AnswerQuestion = (isCorrect: boolean) => void;

export function Question({
  activity,
  round,
  question,
  answerQuestion,
}: {
  activity: ApiActivity;
  question: ApiQuestion;
  round?: ApiRound;
  answerQuestion: AnswerQuestion;
}) {
  return (
    <Wrapper>
      <div className={questionTitle}>
        <span className={activityName}>{activity.activity_name}</span>
        {round ? ` / ${round.round_title}` : null}
        <span className={questionNumber}>Q{1}.</span>
      </div>
      <div className={stimulus}>{question.stimulus}</div>
      <ButtonBar>
        <Button onClick={() => answerQuestion(true)}>Correct</Button>
        <Button onClick={() => answerQuestion(false)}>Incorrect</Button>
      </ButtonBar>
    </Wrapper>
  );
}
