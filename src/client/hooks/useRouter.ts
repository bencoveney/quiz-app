import { useCallback, useEffect, useState } from "react";
import { Quiz } from "./useApi";

export type Page =
  | {
      kind: "home";
    }
  | {
      kind: "loading";
    }
  | { kind: "activity"; activityName: string };

export type Router = {
  page: Page;
  goHome: () => void;
  goToActivity: (activityName: string) => void;
};

export function useRouter(quiz: Quiz | null): Router {
  const [page, setPage] = useState<Page>(
    quiz === null ? { kind: "loading" } : { kind: "home" }
  );

  // Transition from "loading" to "home" once the data is present.
  useEffect(() => {
    if (quiz !== null) {
      setPage({ kind: "home" });
    }
  }, [quiz]);

  const goHome = useCallback(
    () =>
      setPage({
        kind: "home",
      }),
    [setPage]
  );
  const goToActivity = useCallback(
    (activityName: string) =>
      setPage({
        kind: "activity",
        activityName,
      }),
    [setPage]
  );

  return {
    page,
    goHome,
    goToActivity,
  };
}
