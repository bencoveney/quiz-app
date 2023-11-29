import { useApi } from "../hooks/useApi";
import { Home } from "./home";
import { Activity } from "./activity";
import { useRouter } from "../hooks/useRouter";

export function App() {
  const quiz = useApi();
  const { route, goHome, goToActivity } = useRouter(quiz);
  switch (route.page) {
    case "home":
      return <Home quiz={quiz!} startActivity={goToActivity} />;
    case "activity":
      const currentActivity = quiz!.activities.find(
        (activity) => activity.activity_name === route.activityName
      )!;
      return <Activity activity={currentActivity} goHome={goHome} />;
    default:
    case "loading":
      return "loading";
  }
}
