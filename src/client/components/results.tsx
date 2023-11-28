export function Results({ goHome }: { goHome: () => void }) {
  return (
    <div>
      <div>Activity One</div>
      <div>Results</div>
      <div>Q1: Correct</div>
      <div>Q1: False</div>
      <div>Q1: Correct</div>
      <div>Q1: False</div>
      <div>Q1: Correct</div>
      <button onClick={goHome}>Home</button>
    </div>
  );
}
