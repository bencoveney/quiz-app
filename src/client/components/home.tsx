import { Quiz } from "../hooks/useApi";
import { Button, VerticalButtons } from "./button";
import { Wrapper } from "./wrapper";
import { company, title } from "./home.module.css";

export type StartActivity = (activityName: string) => void;

export function Home({
  quiz,
  startActivity,
}: {
  quiz: Quiz;
  startActivity: StartActivity;
}) {
  const buttons = quiz.activities.map((activity) => (
    <Button
      key={activity.activity_name}
      onClick={() => startActivity(activity.activity_name)}
    >
      {activity.activity_name}
    </Button>
  ));
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
  return (
    <Wrapper>
      <span className={company}>CAE</span>
      <h1 className={title}>{quiz.name}</h1>
      <VerticalButtons>{buttons}</VerticalButtons>
      <Button onClick={() => void 0} disabled>
        Results
      </Button>
    </Wrapper>
  );
}
