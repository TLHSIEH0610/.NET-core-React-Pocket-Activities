import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "../../features/activities/activitiesSlice";
import usersReducer from "../../features/users/usersSlice";

const store = configureStore({
  reducer: {
    acticities: activitiesReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
