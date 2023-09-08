import { Grid } from "semantic-ui-react";
import { useAppSelector, useAppDispatch } from "../../../app/store/hooks";
// import { decrement, increment } from "../activitiesSlice";

const ActivityDashboard = () => {
  const acticities = useAppSelector((state) => state.acticities);
  // const dispatch = useAppDispatch();

  console.log({ acticities });
  return (
    <Grid>
      <Grid.Column width="10"></Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
