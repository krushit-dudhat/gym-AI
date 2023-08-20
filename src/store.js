import { configureStore } from '@reduxjs/toolkit';
import workoutPlanReducer from './action/workout';


// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    workoutPlan: workoutPlanReducer,
  }
});

export default store;
