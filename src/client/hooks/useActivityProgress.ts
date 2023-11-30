import { useCallback, useMemo, useState } from "react";
import { Activity, Question, Round, isRound } from "./useApi";
import { SaveResults } from "./useSavedResults";

export type AnswerQuestion = (answer: boolean) => void;
export type QuestionDescription = { round?: Round; question: Question };

export type ActivityRunning = {
  kind: "running";
  answerQuestion: AnswerQuestion;
  currentQuestion: QuestionDescription;
};
export type ActitityResults = {
  kind: "results";
  results: boolean[];
};
export type ActivityProgress = ActitityResults | ActivityRunning;

export function useActivityProgress(
  activity: Activity,
  save: SaveResults
): ActivityProgress {
  // Flatten the list of questions, as described in the README.
  const flatListOfQuestions = useMemo(
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

  // For results, we just need to know: For each question, did the user get it correct.
  const [results, setResults] = useState<boolean[]>([]);

  // When the user answers a question, store the answer and advance to the next one.
  const answerQuestion = useCallback(
    (answer: boolean) => {
      const currentQuestion = flatListOfQuestions[results.length];
      const newResults = [
        ...results,
        currentQuestion.question.is_correct === answer,
      ];
      setResults(newResults);
      if (newResults.length >= flatListOfQuestions.length) {
        save(activity.activity_name, results);
      }
    },
    [results]
  );

  // Once we reach the end of the list of questions, show the results.
  if (results.length >= flatListOfQuestions.length) {
    return {
      kind: "results",
      results,
    };
  }

  const currentQuestion = flatListOfQuestions[results.length];

  return {
    kind: "running",
    answerQuestion,
    currentQuestion,
  };
}
