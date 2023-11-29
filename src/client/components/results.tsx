import { Wrapper } from "./wrapper";

export function Results({
  goHome,
  results,
}: {
  goHome: () => void;
  results: boolean[];
}) {
  return (
    <Wrapper>
      <div>
        <div>Activity One</div>
        <div>Results</div>
        {results.map((result, index) => (
          <div key={index}>
            Q{index}: {result ? "Correct" : "False"}
          </div>
        ))}
        <button onClick={goHome}>Home</button>
      </div>
    </Wrapper>
  );
}
