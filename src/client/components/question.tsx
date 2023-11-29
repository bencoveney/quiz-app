import {
  Question as ApiQuestion,
  Activity as ApiActivity,
  Round as ApiRound,
} from "../hooks/useApi";
import { Wrapper } from "./wrapper";

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
      <div>
        <div>
          {activity.activity_name}
          {round ? ` / ${round.round_title}` : null}
        </div>
        <div>Q{1}</div>
        <div>{question.stimulus}</div>
        <button onClick={() => answerQuestion(true)}>Correct</button>
        <button onClick={() => answerQuestion(false)}>Incorrect</button>
      </div>
    </Wrapper>
  );
}
