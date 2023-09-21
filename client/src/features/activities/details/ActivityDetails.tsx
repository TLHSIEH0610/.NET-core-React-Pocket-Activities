import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useParams } from "react-router-dom";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import { loadActivity } from "../queries";
import { getUser } from "../../users/queries";

const ActivityDetails = () => {
  const { id } = useParams();
  const { data: activity, isLoading: activityLoading } = loadActivity(id || "");
  const { data: user, isLoading: getUserLoading } = getUser();

  if (activity && user) {
    activity.isGoing = Boolean(
      activity.attendees?.find((a) => a.appUserId === user.appUserId)
    );
    activity.isHost = activity.hostUserId === user.appUserId;

    activity.host = activity.attendees?.find(
      (a) => a.appUserId === activity.hostUserId
    );
  }

  if (activityLoading || getUserLoading || !activity)
    return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat activityId={activity.id || ""} />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailsSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDetails;
