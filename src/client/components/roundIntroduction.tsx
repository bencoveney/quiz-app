import { useEffect } from "react";
import { Activity as ApiActivity, Round as ApiRound } from "../hooks/useApi";
import { Wrapper } from "./wrapper";

export function RoundIntroduction({
  activity,
  round,
  dismiss,
}: {
  activity: ApiActivity;
  round?: ApiRound;
  dismiss: () => void;
}) {
  useEffect(() => {
    const timeout = setTimeout(dismiss, 1000);
    return () => clearTimeout(timeout);
  });
  return <Wrapper>Round Introduction</Wrapper>;
}
