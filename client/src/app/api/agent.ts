import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const responseBody = (response: AxiosResponse) => response.data;

axios.defaults.baseURL = "http://localhost:5000/api";

const methods = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const agent = {
  list: () => methods.get<Activity[]>("/activities"),
  details: (id: string) => methods.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => methods.post<void>(`/activities`, activity),
  update: (activity: Activity) =>
    methods.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => methods.delete<void>(`/activities/${id}`),
};

export default agent;
