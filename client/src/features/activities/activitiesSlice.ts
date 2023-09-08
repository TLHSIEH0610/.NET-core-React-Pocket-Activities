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
    set: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { set } = activitiesSlice.actions;

export default activitiesSlice.reducer;
