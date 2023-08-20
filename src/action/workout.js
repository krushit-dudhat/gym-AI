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
    // updatePreference: (state, action) => {
    //     console.log(action);
    //     state = action.payload;
    //     console.log('state after change', state);
    // },
    // updateGender: (state, action) => {
    //   state.gender = action.payload;
    // },
    // updateAge: (state, action) => {
    //   state.age = action.payload;
    // },
    // updateHeight: (state, action) => {
    //   state.height = action.payload;
    // },
    // updateWeight: (state, action) => {
    //   state.weight = action.payload;
    // },
    // updateGymTime: (state, action) => {
    //   state.gymTime = action.payload;
    // },
    updateField: (state, action) => {
      let { field, value } = action.payload;
      state[field] = value;
    },
    // updateTargetMuscle: (state, action) => {
    //   let { muscles } = action.payload;
    // },
    updateWorkoutPlan: (state, action) => {
      state.workoutRoutine = action.payload;
      state.isLoading = false;
    }

  }
});

export const { updateField, updateWorkoutPlan } = workoutPlanSlice.actions;
export default workoutPlanSlice.reducer;
