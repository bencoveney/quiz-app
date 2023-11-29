import { useApi } from "../hooks/useApi";
import { Home } from "./home";
import { Activity } from "./activity";
import { useRouter } from "../hooks/useRouter";
import { useSavedResults } from "../hooks/useSavedResults";
import { Wrapper } from "./wrapper";
import { Header } from "./header";
import { Results } from "./results";

export function App() {
  const quiz = useApi();
  const { route, goHome, goToActivity, goToResults } = useRouter(quiz);
  const { save, saved } = useSavedResults();
  switch (route.page) {
    case "home":
      return (
        <Home
          quiz={quiz!}
          startActivity={goToActivity}
          goToResults={saved !== null ? goToResults : undefined}
        />
      );
    case "activity": {
      const currentActivity = quiz!.activities.find(
        (activity) => activity.activity_name === route.activityName
      )!;
      return (
        <Activity activity={currentActivity} save={save} goHome={goHome} />
      );
    }
    case "results": {
      const currentActivity = quiz!.activities.find(
        (activity) => activity.activity_name === saved!.activityName
      )!;
      return (
        <Results
          goHome={goHome}
          results={saved!.results}
          activity={currentActivity}
        />
      );
    }
    default:
    case "loading":
      return (
        <Wrapper thin>
          <Header subheading="CAE" heading="Loading" />
        </Wrapper>
      );
  }
}
