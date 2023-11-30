import { useCallback, useEffect, useState } from "react";
import { Quiz } from "./useApi";

export type Page =
  | {
      page: "home";
    }
  | {
      page: "loading";
    }
  | { page: "activity"; activityName: string }
  | { page: "results" };

export type Router = {
  route: Page;
  goHome: () => void;
  goToActivity: (activityName: string) => void;
  goToResults: () => void;
};

export function useRouter(quiz: Quiz | null): Router {
  const [page, setPage] = useState<Page>(
    quiz === null ? { page: "loading" } : { page: "home" }
  );

  // Transition from "loading" to "home" once the data is present.
  useEffect(() => {
    if (quiz !== null) {
      setPage({ page: "home" });
    }
  }, [quiz]);

  // Export a friendlier API for changing pages.
  const goHome = useCallback(() => setPage({ page: "home" }), [setPage]);
  const goToActivity = useCallback(
    (activityName: string) =>
      setPage({
        page: "activity",
        activityName,
      }),
    [setPage]
  );
  const goToResults = useCallback(
    () => setPage({ page: "results" }),
    [setPage]
  );

  return {
    route: page,
    goHome,
    goToActivity,
    goToResults,
  };
}
