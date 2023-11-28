import { Quiz } from "../hooks/useApi";

export type StartActivity = (activityName: string) => void;

export function Home({
  quiz,
  startActivity,
}: {
  quiz: Quiz;
  startActivity: StartActivity;
}) {
  return (
    <div>
      <span>CAE</span>
      <h1>{quiz.name}</h1>
      <div>
        {quiz.activities.map((activity) => (
          <button
            key={activity.activity_name}
            onClick={() => startActivity(activity.activity_name)}
          >
            {activity.activity_name}
          </button>
        ))}
      </div>
      <div>Results</div>
    </div>
  );
}
