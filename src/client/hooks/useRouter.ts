import { useCallback, useEffect, useState } from "react";
import { Quiz } from "./useApi";

export type Page =
  | {
      page: "home";
    }
  | {
      page: "loading";
    }
  | { page: "activity"; activityName: string };

export type Router = {
  route: Page;
  goHome: () => void;
  goToActivity: (activityName: string) => void;
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

  const goHome = useCallback(
    () =>
      setPage({
        page: "home",
      }),
    [setPage]
  );
  const goToActivity = useCallback(
    (activityName: string) =>
      setPage({
        page: "activity",
        activityName,
      }),
    [setPage]
  );

  return {
    route: page,
    goHome,
    goToActivity,
  };
}
