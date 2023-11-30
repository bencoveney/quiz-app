import { useCallback, useState } from "react";

type SaveData = {
  activityName: string;
  results: boolean[];
};
export type SaveResults = (activityName: string, results: boolean[]) => void;
export type SavedResults = {
  save: SaveResults;
  saved: SaveData | null;
};

const localStorageKey = "SAVED_RESULTS";
function loadFromLocalStorage(): SaveData | null {
  const found = localStorage.getItem(localStorageKey);
  if (found !== null) {
    return JSON.parse(found);
  }
  return null;
}
function saveToLocalStorage(saveData: SaveData) {
  localStorage.setItem(localStorageKey, JSON.stringify(saveData));
}

export function useSavedResults(): SavedResults {
  const [saved, setSaved] = useState<SaveData | null>(loadFromLocalStorage());
  const save = useCallback((activityName: string, results: boolean[]) => {
    const saveData: SaveData = { activityName, results };
    saveToLocalStorage(saveData);
    setSaved({ activityName, results });
  }, []);
  return { save, saved };
}
