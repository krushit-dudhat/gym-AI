import { createSlice } from '@reduxjs/toolkit';

const workoutPlanSlice = createSlice({
  name: 'workoutPlan',
  initialState: {
    gender: 'male',
    height: 156,
    weight: 70,
    age: 25,
    goal: 'Build Muscle', // stay fit // weight loss
    targetMuscle: [],
    gymTime: 1,
    isLoading: false,
    workoutRoutine: [],
  },
  reducers: {
    updateField: (state, action) => {
      let { field, value } = action.payload;
      state[field] = value;
    },
    updateWorkoutPlan: (state, action) => {
      state.workoutRoutine = action.payload;
      state.isLoading = false;
    }

  }
});

export const { updateField, updateWorkoutPlan } = workoutPlanSlice.actions;
export default workoutPlanSlice.reducer;
