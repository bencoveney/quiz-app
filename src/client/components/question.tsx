import {
  Question as ApiQuestion,
  Activity as ApiActivity,
  Round as ApiRound,
} from "../hooks/useApi";

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
    <div>
      <div>
        {activity.activity_name}
        {round ? ` / Round ${round.round_title}` : null}
      </div>
      <div>{question.stimulus}</div>
      <div>Q{question.order}</div>
      <button onClick={() => answerQuestion(true)}>Correct</button>
      <button onClick={() => answerQuestion(false)}>Incorrect</button>
    </div>
  );
}
