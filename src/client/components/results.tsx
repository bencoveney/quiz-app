import { Header } from "./header";
import { Rows } from "./rows";
import { Wrapper } from "./wrapper";
import { resultRow, questionNumber, answer } from "./results.module.css";
import { Button } from "./button";

export function Results({
  goHome,
  results,
}: {
  goHome: () => void;
  results: boolean[];
}) {
  return (
    <Wrapper thin>
      <Header heading={"Results"} subheading={"Activity One"} />
      <Rows>
        {results.map((result, index) => (
          <div className={resultRow} key={index}>
            <span className={questionNumber}>Q{index + 1}</span>{" "}
            <span className={answer}>{result ? "Correct" : "False"}</span>
          </div>
        ))}
      </Rows>
      <Button onClick={goHome}>Home</Button>
    </Wrapper>
  );
}
