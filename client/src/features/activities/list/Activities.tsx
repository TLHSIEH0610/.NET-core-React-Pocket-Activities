import { Grid, Header } from "semantic-ui-react";
import { loadActivities, deleteActivity } from "../queries";
import ActivityItem from "./ActivityItem";
import { Activity } from "../../../app/models/activity";
import { Fragment, useMemo } from "react";
import { DateTime } from "luxon";
import { getUser } from "../../users/queries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Pagination } from "semantic-ui-react";
import ActivityFilter from "./ActivityFilter";
import { useSearchParams } from "react-router-dom";

const ActivityDashboard = () => {
  const [searchParams] = useSearchParams();

  const queryString = new URLSearchParams(
    Object.fromEntries(searchParams)
  ).toString();

  const { data: activities = [], isLoading: activityLoading } =
    loadActivities(queryString);
  const { data: user, isLoading: getUserLoading } = getUser();
  const { mutate: deleteMutation } = deleteActivity();

  const groupedActivities = useMemo(() => {
    if (!activities || !user) return [];
    return Object.entries(
      activities.reduce((activities, activity) => {
        const groupDate = DateTime.fromISO(activity.date as unknown as string)
          .toFormat("dd-MM-yyyy")
          .toString();

        activity.isGoing = Boolean(
          activity.attendees?.find((a) => a.appUserId === user.appUserId)
        );
        activity.isHost = activity.hostUserId === user.appUserId;

        activity.host = activity.attendees?.find(
          (a) => a.appUserId === activity.hostUserId
        );

        activities[groupDate] = activities[groupDate]
          ? [...activities[groupDate], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }, [activities, user]);

  if (activityLoading || getUserLoading) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        {groupedActivities?.map(([group, activities]) => (
          <Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>
            {activities &&
              activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </Fragment>
        ))}
        <PaginationComponent />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
//todo: implement pagination feature
const PaginationComponent = () => (
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={10}
  />
);
