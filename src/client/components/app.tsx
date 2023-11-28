import { useApi } from "../hooks/useApi";
import { Home } from "./home";
import { Activity } from "./activity";
import { useRouter } from "../hooks/useRouter";

export function App() {
  const quiz = useApi();
  const { page, goHome, goToActivity } = useRouter(quiz);
  switch (page.kind) {
    case "home":
      return <Home quiz={quiz!} startActivity={goToActivity} />;
    case "activity":
      const currentActivity = quiz!.activities.find(
        (activity) => activity.activity_name === page.activityName
      )!;
      return <Activity activity={currentActivity} goHome={goHome} />;
    default:
    case "loading":
      return "loading";
  }
}
