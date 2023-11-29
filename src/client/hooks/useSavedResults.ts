import { useCallback, useState } from "react";

export type SaveResults = (activityName: string, results: boolean[]) => void;
export type SavedResults = {
  save: SaveResults;
  saved: null | {
    activityName: string;
    results: boolean[];
  };
};

export function useSavedResults(): SavedResults {
  const [saved, setSaved] = useState<null | {
    activityName: string;
    results: boolean[];
  }>(null);
  const save = useCallback((activityName: string, results: boolean[]) => {
    setSaved({ activityName, results });
  }, []);
  return { save, saved };
}
