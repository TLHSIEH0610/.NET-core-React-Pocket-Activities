import { Grid, Header } from "semantic-ui-react";
import { loadActivities } from "../queries";
import ActivityItem from "./ActivityItem";
import { Activity } from "../../../app/models/activity";
import { Fragment, useMemo } from "react";
import { DateTime } from "luxon";
import { getUser } from "../../users/queries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Pagination } from "semantic-ui-react";
import ActivityFilter from "./ActivityFilter";
import { useSearchParams } from "react-router-dom";
import { PaginationProps } from "../../../app/models/pagination";

const ActivityDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = new URLSearchParams(
    Object.fromEntries(searchParams)
  ).toString();

  const { data, isLoading: activityLoading } = loadActivities(queryString);
  const { data: user, isLoading: getUserLoading } = getUser();

  const activities = data?.data;
  const pagination = data?.pagination;

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
            <Header sub color="blue">
              {group}
            </Header>
            {activities &&
              activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </Fragment>
        ))}
        {pagination && (
          <PaginationComponent
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            pagination={pagination}
          />
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;

const PaginationComponent = ({
  setSearchParams,
  searchParams,
  pagination,
}: {
  setSearchParams: any;
  searchParams: any;
  pagination: PaginationProps;
}) => (
  <Pagination
    onPageChange={(e, { activePage }) => {
      console.log(e, activePage);
      setSearchParams({ ...searchParams, currentPage: activePage });
    }}
    boundaryRange={0}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    activePage={pagination.currentPage || 1}
    totalPages={pagination.totalPage || 10}
  />
);
