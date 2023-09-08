import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../../app/api/agent";
import { Activity } from "../../app/models/activity";

export const loadActivities = () => {
  return useQuery({
    queryKey: ["loadActivities"],
    queryFn: () => agent.list(),
  });
};

export const loadActivity = (id: string) => {
  return useQuery({
    queryKey: ["loadActivity", id],
    queryFn: () => agent.details(id),
  });
};

export const createActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: Activity) => agent.create(activity),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const updateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: Activity) => agent.update(activity),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const deleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => agent.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};
