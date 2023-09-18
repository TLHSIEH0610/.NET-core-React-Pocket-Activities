import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { set } = usersSlice.actions;

export default usersSlice.reducer;
