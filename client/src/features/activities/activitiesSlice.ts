import { createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../app/models/activity";

interface State {}

const initialState: State = {};

export const activitiesSlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = activitiesSlice.actions;

export default activitiesSlice.reducer;
