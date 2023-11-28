import { useEffect, useState } from "react";
import { Question as ApiQuestion, useApi } from "../hooks/useApi";
import { Home } from "./home";
import { Question } from "./question";
import { Results } from "./results";

export function App() {
  const quiz = useApi();
  const [page, setPage] = useState<string>(quiz === null ? "loading" : "home");
  useEffect(() => {
    if (quiz !== null) {
      setPage("home");
    }
  }, [quiz]);
  switch (page) {
    case "home":
      return <Home quiz={quiz!} startActivity={() => setPage("question")} />;
    case "question":
      return (
        <Question
          question={quiz!.activities[0].questions[0] as ApiQuestion}
          activity={quiz!.activities[0]}
          answerQuestion={() => setPage("results")}
        />
      );
    case "results":
      return <Results goHome={() => setPage("home")}></Results>;
    default:
    case "loading":
      return "loading";
  }
}
