import { Quiz } from "../hooks/useApi";
import { Button } from "./button";
import { Wrapper } from "./wrapper";
import { Rows } from "./rows";
import { Header } from "./header";

export type StartActivity = (activityName: string) => void;

export function Home({
  quiz,
  startActivity,
  goToResults,
}: {
  quiz: Quiz;
  startActivity: StartActivity;
  goToResults?: () => void;
}) {
  const buttons = quiz.activities.map((activity) => (
    <Button
      key={activity.activity_name}
      onClick={() => startActivity(activity.activity_name)}
    >
      {activity.activity_name}
    </Button>
  ));

  // Pad buttons list to 5.
  while (buttons.length < 5) {
    buttons.push(
      <Button
        key={`fake_button_${buttons.length}`}
        onClick={() => void 0}
        disabled
      >
        Activity {buttons.length}
      </Button>
    );
  }

  // If we have a results callback, results are available.
  const resultsButton = goToResults ? (
    <Button onClick={goToResults}>Results</Button>
  ) : (
    <Button onClick={() => void 0} disabled>
      Results
    </Button>
  );

  return (
    <Wrapper thin>
      <Header heading={quiz.name} subheading="CAE" />
      <Rows>{buttons}</Rows>
      {resultsButton}
    </Wrapper>
  );
}
