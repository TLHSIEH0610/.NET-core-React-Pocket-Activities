import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../features/users/queries";
import LoadingComponent from "../layout/LoadingComponent";

const RequireAuth = () => {
  const { data: user, isLoading } = getUser();

  const location = useLocation();

  if (isLoading) return <LoadingComponent />;

  if (!user) return <Navigate to="/" state={{ from: location }} />;

  return <Outlet />;
};

export default RequireAuth;
