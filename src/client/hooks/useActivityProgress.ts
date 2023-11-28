import { useCallback, useMemo, useState } from "react";
import { Activity, Question, Round, isRound } from "./useApi";

export type ActitityResults = {
  kind: "results";
  results: boolean[];
};

export type AnswerQuestion = (answer: boolean) => void;

export type ActivityRunning = QuestionDescription & {
  kind: "running";
  answerQuestion: AnswerQuestion;
};

export type ActivityProgress = ActitityResults | ActivityRunning;

type QuestionDescription = { round?: Round; question: Question };

export function useActivityProgress(activity: Activity): ActivityProgress {
  const flattened = useMemo(
    () =>
      activity.questions.flatMap<QuestionDescription>((questionOrRound) => {
        if (isRound(questionOrRound)) {
          return questionOrRound.questions.map((question) => ({
            round: questionOrRound,
            question,
          }));
        } else {
          return [{ question: questionOrRound }];
        }
      }),
    [activity]
  );

  const [results, setResults] = useState<boolean[]>([]);

  const answerQuestion = useCallback(
    (answer: boolean) => {
      const currentQuestion = flattened[results.length];
      console.log(answer, currentQuestion.question.is_correct, currentQuestion);
      setResults([...results, currentQuestion.question.is_correct === answer]);
    },
    [results]
  );

  if (results.length >= flattened.length) {
    return {
      kind: "results",
      results,
    };
  }

  const currentQuestion = flattened[results.length];

  return {
    kind: "running",
    answerQuestion,
    ...currentQuestion,
  };
}