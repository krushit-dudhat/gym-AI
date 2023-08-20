import UserPreference from "./UserPreference";
import WorkoutPlan from "./WorkoutPlan";

export default function Home() {
  return (
    <div className='flex h-screen flex-col md:flex-row'>
      <UserPreference />
      <WorkoutPlan />
    </div>
  );
}
