import { useQuery, useMutation } from "@tanstack/react-query";
import agent from "../../app/api/agent";
import { UserFormValues } from "../../app/models/user";

export const login = () => {
  return useMutation({
    mutationFn: (form: UserFormValues) => agent.account.login(form),
    onError: (error) => console.log(error),
  });
};

export const register = () => {
  return useMutation({
    mutationFn: (form: UserFormValues) => agent.account.register(form),
  });
};

export const getUser = () => {
  const token = localStorage.getItem("jwt");
  return useQuery({
    queryKey: ["getUser"],
    queryFn: () => agent.account.current(),
    enabled: Boolean(token),
  });
};
