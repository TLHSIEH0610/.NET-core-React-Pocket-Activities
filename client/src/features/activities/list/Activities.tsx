import { Header } from "semantic-ui-react";
import { loadActivities, deleteActivity } from "../queries";
import ActivityItem from "./ActivityItem";
import { Activity } from "../../../app/models/activity";
import { Fragment, useMemo } from "react";
import { DateTime } from "luxon";

const ActivityDashboard = () => {
  // const acticities = useAppSelector((state) => state.acticities);

  const { data: activities = [], isLoading } = loadActivities();
  const { mutate: deleteMutation } = deleteActivity();

  const groupedActivities = useMemo(
    () =>
      Object.entries(
        activities.reduce((activities, activity) => {
          const groupDate = DateTime.fromISO(activity.date as unknown as string)
            .toFormat("dd-MM-yyyy")
            .toString();

          activities[groupDate] = activities[groupDate]
            ? [...activities[groupDate], activity]
            : [activity];
          return activities;
        }, {} as { [key: string]: Activity[] })
      ),
    [activities]
  );

  return groupedActivities?.map(([group, activities]) => (
    <Fragment key={group}>
      <Header sub color="teal">
        {group}
      </Header>
      {activities &&
        activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
    </Fragment>
  ));
};

export default ActivityDashboard;
