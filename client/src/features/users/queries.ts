import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../../app/api/agent";
import { UserFormValues } from "../../app/models/user";

export const login = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormValues) => agent.account.login(form),
    //   onSuccess: () =>
    //     queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const register = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormValues) => agent.account.register(form),
    //   onSuccess: () =>
    //     queryClient.invalidateQueries({ queryKey: ["loadActivities"] }),
  });
};

export const getUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: () => agent.account.current(),
  });
};
