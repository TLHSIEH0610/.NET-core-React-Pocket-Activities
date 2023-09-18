import { createSlice } from "@reduxjs/toolkit";

interface State {
  open: boolean;
  body: null | JSX.Element;
}

const initialState: State = {
  open: false,
  body: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.body = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.body = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = commonSlice.actions;

export default commonSlice.reducer;
