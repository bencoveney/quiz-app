import { Header } from "./header";
import { Rows } from "./rows";
import { Wrapper } from "./wrapper";
import { resultRow, questionNumber, answer } from "./results.module.css";
import { Button } from "./button";
import { ReactNode } from "react";
import { Activity, isRound } from "../hooks/useApi";

export function Results({
  goHome,
  results,
  activity,
}: {
  goHome: () => void;
  results: boolean[];
  activity: Activity;
}) {
  // Results have been stored in a flat array, but the activity structure could be nested.
  // We need to zip those two models back together, while inserting the "round" heading in the correct places.
  // We can simplify the zipping process by "shifting" from the results array. This would mutate
  // it, hence the copy.
  const rows: ReactNode[] = [];
  const resultsCopy = [...results];
  activity.questions.forEach((questionOrRound) => {
    if (isRound(questionOrRound)) {
      rows.push(<>{questionOrRound.round_title}</>);
      questionOrRound.questions.forEach((question) => {
        const result = resultsCopy.shift();
        rows.push(
          <>
            <span className={questionNumber}>Q{question.order}</span>{" "}
            <span className={answer}>{result ? "Correct" : "False"}</span>
          </>
        );
      });
    } else {
      const result = resultsCopy.shift();
      rows.push(
        <>
          <span className={questionNumber}>Q{questionOrRound.order}</span>{" "}
          <span className={answer}>{result ? "Correct" : "False"}</span>
        </>
      );
    }
  });

  return (
    <Wrapper thin>
      <Header heading={"Results"} subheading={"Activity One"} />
      <Rows>
        {...rows.map((row, index) => (
          <div className={resultRow} key={index}>
            {row}
          </div>
        ))}
      </Rows>
      <Button onClick={goHome}>Home</Button>
    </Wrapper>
  );
}
