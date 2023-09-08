import { Grid } from "semantic-ui-react";
import { useAppSelector, useAppDispatch } from "../../../app/store/hooks";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../app/api/agent";

const ActivityDashboard = () => {
  const acticities = useAppSelector((state) => state.acticities);

  const { data } = useQuery({
    queryKey: ["loadActivities"],
    queryFn: () => agent.list(),
  });

  return (
    <Grid>
      <Grid.Column width="10"></Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
