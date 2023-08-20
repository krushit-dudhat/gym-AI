import UserPreference from "./UserPreference";
import WorkoutPlan from "./WorkoutPlan";

export default function Home() {
  return (
    <div className='flex h-5/6 flex-col md:flex-row'>
      <UserPreference />
      <WorkoutPlan />
    </div>
  );
}
