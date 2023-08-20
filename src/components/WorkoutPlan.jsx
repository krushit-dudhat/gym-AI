import { useEffect } from "react";
import { useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function WorkoutPlan() {
  const { workoutRoutine, isLoading } = useSelector((state) => state.workoutPlan);

  console.log('records ', workoutRoutine);
  // useEffect(() => {
  //   console.log('records ', workoutRoutine);
  // }, [isLoading]);

  return (
    <>
      <div className='container bg-slate-900 md:w-1/2 md:m-0 w-full m-auto p-2 h-full'>
        <div className='border-2 border-gray-100 text-white h-full'>
          <h1 className='text-center text-3xl m-3 font-serif '>
            your personalized workout plan
          </h1>
          {isLoading ? (
            <>
              <DotLoader
                color='hsla(168, 0%, 100%, 1)'
                cssOverride={override}
                loading
                size={150}
                speedMultiplier={0.7}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </>
          ) : workoutRoutine.length > 0 ? (
            workoutRoutine.map((workout, index) => {
              return (
                <div key={index} className='flex flex-col m-3'>
                  <div>
                    <h3>{workout.day}</h3>
                    <ul className='list-disc '>
                      {workout.workoutplan.map((exe, i) => {
                        return (
                          <li
                            key={i}
                            className='flex mx-5 my-1 justify-between '
                          >
                            <span className='space-x-4'>{exe.exercise}</span>
                            <span className='space-x-4'>{exe.raps}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-center text-xl m-10 text-amber-500 align-middle'>
              Please select preferances for workout plan
            </div>
          )}
        </div>
      </div>
    </>
  );
}
