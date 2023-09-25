import axios, { AxiosResponse, AxiosError } from "axios";
import { Activity } from "../models/activity";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { UserFormValues, User } from "../models/user";
import { Photo, Profile } from "../models/profile";

const baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data.pagination = JSON.parse(pagination);
    }
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
  list: (queryString: string) =>
    methods.get<Activity[]>(`/activities?${queryString ?? ""}`),
  details: (id: string) => methods.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => methods.post<void>(`/activities`, activity),
  update: (activity: Activity) =>
    methods.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => methods.delete<void>(`/activities/${id}`),
  attend: (id: string) => methods.post<void>(`/activities/attend/${id}`, {}),
};

const account = {
  current: () => methods.get<User>("account"),
  login: (user: UserFormValues) => methods.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    methods.post<User>("/account/register", user),
};

const profile = {
  get: (id: string) => methods.get<Profile>(`/profiles/${id}`),
  uploadPhoto: (file: File) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => methods.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => methods.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    methods.put(`/profiles`, profile),
  updateFollowing: (id: string) => methods.post(`/follow/${id}`, {}),
  listFollowings: (id: string, predicate: string) =>
    methods.get<Profile[]>(`/follow/${id}?predicate=${predicate}`),
};

const agent = {
  activity,
  account,
  profile,
};

export default agent;
