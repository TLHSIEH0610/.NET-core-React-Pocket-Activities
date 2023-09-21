import { createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../app/models/activity";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../../app/models/comment";
interface State {
  activityRegistry: Map<string, Activity>;
  hubConnection: HubConnection | null;
  comments: ChatComment[];
}

const initialState: State = {
  activityRegistry: new Map<string, Activity>(),
  hubConnection: null,
  comments: [],
};

export const activitiesSlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    createHubConnection: (state, action) => {
      const activityId = action.payload;
      const token = localStorage.getItem("jwt");
      state.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat?activityId=" + activityId, {
          accessTokenFactory: () => token || "",
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      state.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establishing connection: ", error)
        );

      state.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        comments.forEach((comment) => {
          comment.createdAt = new Date(comment.createdAt + "Z");
        });
        state.comments = comments;
      });

      state.hubConnection.on("ReceiveComment", (comment) => {
        comment.createdAt = new Date(comment.createdAt);
        state.comments.unshift(comment);
      });
    },
    stopHubConnection: (state) => {
      state.comments = [];
      state.hubConnection
        ?.stop()
        .catch((error) => console.log("Error stopping connection: ", error));
    },
  },
});

// Action creators are generated for each case reducer function
export const { createHubConnection, stopHubConnection } =
  activitiesSlice.actions;

export default activitiesSlice.reducer;
