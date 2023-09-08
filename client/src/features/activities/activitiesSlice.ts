import { createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../app/models/activity";

interface State {
  activityRegistry: Map<string, Activity>;
}

const initialState: State = {
  activityRegistry: new Map<string, Activity>(),
};

export const activitiesSlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    // loadActivities: (state) => {
    //   state.value += 1;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {} = activitiesSlice.actions;

export default activitiesSlice.reducer;
