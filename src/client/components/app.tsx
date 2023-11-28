import { useApi } from "../hooks/useApi";

export function App() {
  const api = useApi();
  return api !== null ? <div>{JSON.stringify(api)}</div> : "Loading";
}
