import { useState, useEffect } from "react";

export interface Quiz {
  name: string;
  heading: string;
  activities: Activity[];
}

export interface Activity {
  activity_name: string;
  questions: Round[] | Question[];
  // order
}

export interface Round {
  round_title: string;
  questions: Question[];
  // order
}

export interface Question {
  is_correct: boolean;
  stimulus: string;
  order: number;
  // user_answers
  // feedback
}

export function isRound(candidate: Round | Question): candidate is Round {
  return !!(candidate as Round).round_title;
}

// Fetch the API data once and cache in memory for the lifetime of the page.
const cache = fetch("/api").then((res) => res.json());

export function useApi() {
  const [response, setResponse] = useState<Quiz | null>(null);
  useEffect(() => {
    cache.then((cached) => {
      setResponse(cached);
    });
  }, [setResponse]);
  return response;
}
