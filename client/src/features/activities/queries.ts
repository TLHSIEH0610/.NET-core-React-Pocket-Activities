import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../../app/api/agent";
import { Activity } from "../../app/models/activity";

export const loadActivities = () => {
  return useQuery({
    queryKey: ["loadActivities"],
    queryFn: () => agent.activity.list(),
  });
};

export const loadActivity = (id: string) => {
  return useQuery({
    queryKey: ["loadActivity", id],
    queryFn: () => agent.activity.details(id),
    // select: (activity) => {
    //   activity.host = activity.attendees?.find(
    //     (a) => a.appUserId === activity.hostUserId
    //   );
    //   return activity;
    // },
  });
};

export const createActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: Activity) => agent.activity.create(activity),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const updateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: Activity) => agent.activity.update(activity),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const deleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => agent.activity.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const updateAttendeance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => agent.activity.attend(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivity"] }),
  });
};

export const cancelActivityToggle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => agent.activity.attend(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivity"] }),
  });
};
