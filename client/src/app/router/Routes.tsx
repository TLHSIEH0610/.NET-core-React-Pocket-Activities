import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/list/Activities";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "activities/create", element: <ActivityForm key="create" /> }, //add key to force re-render
      { path: "activities/edit/:id", element: <ActivityForm key="edit" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
