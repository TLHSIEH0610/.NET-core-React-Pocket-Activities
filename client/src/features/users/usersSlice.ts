import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { router } from "../../app/router/Routes";

interface State {
  user: User | null;
  token: string | null;
}

const initialState: State = {
  user: null,
  token: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("jwt", token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("jwt");
      router.navigate("/");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, logout } = usersSlice.actions;

export default usersSlice.reducer;
