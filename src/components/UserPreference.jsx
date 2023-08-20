import { useDispatch, useSelector } from "react-redux";
import { updateField , updateWorkoutPlan} from "../action/workout";
import fetchWorkoutPlan from "../api/openAI";

export default function UserPreference() {

  const prefData = useSelector((state) => state.workoutPlan);
  const dispatch = useDispatch();

  const handleNumberFieldChange = (e, field) => {
    if (prefData[field]) {
      dispatch(updateField({ field, value: parseInt(e.target.value) }));
    }
  }

  const handleRadioChange = (e, field) => {
    if (prefData[field]) {
      dispatch(updateField({ field, value: e.target.value }));
    }
  }

  const handleCheckboxChange = (e, field) => {
    console.log('click')
    if (prefData[field]) {
      let target = e.target.value;
      if (prefData[field].includes(target)) {
        let newTarget = prefData[field].filter((t) => t !== target);
        dispatch(updateField({ field, value: newTarget }));
      } else {
        dispatch(updateField({ field, value: [...prefData[field], target] }));
      }
      // dispatch(updateField({ field, value: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log("submit", e);
    e.preventDefault();

    dispatch(updateField({ field: 'isLoading', value: true }));
    let res = await fetchWorkoutPlan(prefData);
    console.log(res);
    if (res) {
      res = res.records;
      dispatch(updateWorkoutPlan(res));
    }
  }
  
  return (
    <>
      <div className='container bg-slate-900 md:w-1/2 md:m-0 w-full m-auto p-2 h-full'>
        <div className='border-2 border-gray-100 text-white h-full'>
          <h1 className='text-center text-3xl m-3 font-serif '>
            select your preference to get your workout plan
          </h1>

          {/* <form action="#" > */}
          <div className='flex '>
            <label className='m-2 align-middle text-center'> Gender: </label>
            <div className='flex items-center m-2'>
              <input
                checked
                id='gender-male'
                type='radio'
                value='male'
                name='gender'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={(e) => handleRadioChange(e, "gender")}
              />
              <label
                htmlFor='gender-male'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Male
              </label>
            </div>
            <div className='flex items-center m-2'>
              <input
                id='gender-female'
                type='radio'
                value='female'
                name='gender'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={(e) => handleRadioChange(e, "gender")}
              />
              <label
                htmlFor='gender-female'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Female
              </label>
            </div>
          </div>

          <div className='m-2'>
            <label htmlFor='height' className=''>
              {" "}
              Height:{" "}
            </label>
            <input
              type='number'
              name='height'
              id='height'
              className='mx-2 border-2 border-gray-100 text-black'
              value={prefData.height}
              onChange={(e) => handleNumberFieldChange(e, "height")}
            />{" "}
            cm
          </div>

          <div className='m-2'>
            <label htmlFor='weight'> Weight: </label>
            <input
              type='number'
              name='weight'
              id='weight'
              className='mx-2 border-2 border-gray-100 text-black'
              value={prefData.weight}
              onChange={(e) => handleNumberFieldChange(e, "weight")}
            />{" "}
            kg
          </div>

          <div className='m-2'>
            <label htmlFor='age'> Age: </label>
            <input
              type='number'
              name='age'
              id='age'
              className='mx-2 border-2 border-gray-100 text-black'
              value={prefData.age}
              onChange={(e) => handleNumberFieldChange(e, "age")}
            />{" "}
            year
          </div>

          <div className='flex'>
            <label className='m-2 align-middle text-center'> Goal: </label>
            <div className='flex items-center m-2'>
              <input
                checked
                id='goal-build-muscle'
                type='radio'
                value='build muscle'
                name='goal'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={(e) => handleRadioChange(e, "goal")}
              />
              <label
                htmlFor='goal-build-muscle'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                {" "}
                Build Muscle{" "}
              </label>
            </div>
            <div className='flex items-center m-2'>
              <input
                id='goal-fit'
                type='radio'
                value='keep fit'
                name='goal'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={(e) => handleRadioChange(e, "goal")}
              />
              <label
                htmlFor='goal-fit'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Keep Fit
              </label>
            </div>
            <div className='flex items-center m-2'>
              <input
                id='goal-weight-loss'
                type='radio'
                value='lose weight'
                name='goal'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={(e) => handleRadioChange(e, "goal")}
              />
              <label
                htmlFor='goal-weight-loss'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Weight Loss
              </label>
            </div>
          </div>

          <div className='m-2'>
            {/* cehck box exercise targetting different muscle */}

            <h3 className='mb-4 font-semibold text-gray-900 dark:text-white'>
              {" "}
              Select Target Muscle{" "}
            </h3>
            <ul className='items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
              <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
                <div className='flex items-center pl-3'>
                  <input
                    id='back-muscle'
                    type='checkbox'
                    value='back'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                    onChange={(e) => handleCheckboxChange(e, "targetMuscle")}
                  />
                  <label
                    htmlFor='back-muscle'
                    className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Back
                  </label>
                </div>
              </li>
              <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
                <div className='flex items-center pl-3'>
                  <input
                    id='shoulder-muscle'
                    type='checkbox'
                    value='shoulder'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                    onChange={(e) => handleCheckboxChange(e, "targetMuscle")}
                  />
                  <label
                    htmlFor='shoulder-muscle'
                    className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Shoulder
                  </label>
                </div>
              </li>
              <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
                <div className='flex items-center pl-3'>
                  <input
                    id='bicep-muscle'
                    type='checkbox'
                    value='biscep'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                    onChange={(e) => handleCheckboxChange(e, "targetMuscle")}
                  />
                  <label
                    htmlFor='bicep-muscle'
                    className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Bisceps
                  </label>
                </div>
              </li>
              <li className='w-full dark:border-gray-600'>
                <div className='flex items-center pl-3'>
                  <input
                    id='hemstring-muscle'
                    type='checkbox'
                    value='hemstring'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                    onChange={(e) => handleCheckboxChange(e, "targetMuscle")}
                  />
                  <label
                    htmlFor='hemstring-muscle'
                    className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Hemstring
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className='m-2'>
            <label htmlFor='gym-time'> Gym Time: </label>
            <input
              type='number'
              name='gym-time'
              id='gym-time'
              className='mx-2 border-2 border-gray-100 text-black'
              value={prefData.gymTime}
              onChange={(e) => handleNumberFieldChange(e, "gymTime")}
            />{" "}
            hour
          </div>

          <div className='relative h-32'>
            <button
              type='button'
              className='rounded-none bg-white text-black m-2 p-2 w-11/12 absolute inset-x-0 bottom-0 h-12 '
              onClick={(e) => handleSubmit(e)}
            >
              {" "}
              Get Plan!{" "}
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}
