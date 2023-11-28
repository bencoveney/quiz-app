import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { Home } from "./home";
import { Activity } from "./activity";

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
      return <Home quiz={quiz!} startActivity={() => setPage("activity")} />;
    case "activity":
      return (
        <Activity
          activity={quiz!.activities[0]}
          goHome={() => setPage("home")}
        />
      );
    default:
    case "loading":
      return "loading";
  }
}
