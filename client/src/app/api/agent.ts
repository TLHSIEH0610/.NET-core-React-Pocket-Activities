import axios, { AxiosResponse, AxiosError } from "axios";
import { Activity } from "../models/activity";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { UserFormValues, User } from "../models/user";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    //successful
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        //errors": {
        // "City": [
        // "'City' must not be empty."
        // ],}
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        //todo: set error in redux and display in page
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const methods = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const activity = {
  list: () => methods.get<Activity[]>("/activities"),
  details: (id: string) => methods.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => methods.post<void>(`/activities`, activity),
  update: (activity: Activity) =>
    methods.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => methods.delete<void>(`/activities/${id}`),
};

const account = {
  current: () => methods.get<User>("account"),
  login: (user: UserFormValues) => methods.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    methods.post<User>("/account/register", user),
};

const agent = {
  activity,
  account,
};

export default agent;
