import { Quiz } from "../hooks/useApi";
import { Button } from "./button";
import { Wrapper } from "./wrapper";
import { Rows } from "./rows";
import { Header } from "./header";

const MINIMUM_ACTIVITY_BUTTONS = 5;

export function Home({
  quiz,
  startActivity,
  goToResults,
}: {
  quiz: Quiz;
  startActivity: (activityName: string) => void;
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

  // Pad buttons list.
  while (buttons.length < MINIMUM_ACTIVITY_BUTTONS) {
    buttons.push(
      <Button
        key={`fake_button_${buttons.length}`}
        onClick={() => void 0}
        disabled
      >
        Activity {buttons.length + 1}
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
