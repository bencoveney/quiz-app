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
        <span className={activityName}>
          {activity.activity_name}
          {round ? ` / ${round.round_title}` : null}
        </span>
        <span className={questionNumber}>Q{1}.</span>
      </div>
      <Stimulus content={question.stimulus} />
      <ButtonBar>
        <Button onClick={() => answerQuestion(true)}>Correct</Button>
        <Button onClick={() => answerQuestion(false)}>Incorrect</Button>
      </ButtonBar>
    </Wrapper>
  );
}

function Stimulus({ content }: { content: string }) {
  const matches = /\*([^\*]*)\*/g.exec(content);
  const formattedContent = content.replace(
    matches![0],
    `<strong>${matches![1]}</strong>`
  );
  return (
    <div
      className={stimulus}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
}
