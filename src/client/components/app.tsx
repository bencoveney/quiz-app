import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { Home } from "./home";
import { Activity } from "./activity";

type Page =
  | {
      kind: "home";
    }
  | {
      kind: "loading";
    }
  | { kind: "activity"; activityName: string };

export function App() {
  const quiz = useApi();
  const [page, setPage] = useState<Page>(
    quiz === null ? { kind: "loading" } : { kind: "home" }
  );
  useEffect(() => {
    if (quiz !== null) {
      setPage({ kind: "home" });
    }
  }, [quiz]);
  switch (page.kind) {
    case "home":
      return (
        <Home
          quiz={quiz!}
          startActivity={(activityName) =>
            setPage({ kind: "activity", activityName })
          }
        />
      );
    case "activity":
      return (
        <Activity
          activity={
            quiz!.activities.find(
              (activity) => activity.activity_name === page.activityName
            )!
          }
          goHome={() => setPage({ kind: "home" })}
        />
      );
    default:
    case "loading":
      return "loading";
  }
}
