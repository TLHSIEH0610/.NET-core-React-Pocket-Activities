import { SyntheticEvent, useState } from "react";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { UserEvent } from "../../app/models/profile";
import { loadUserEvents } from "./queries";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { DateTime } from "luxon";

const panes = [
  { menuItem: "Future Events", pane: { key: "future" } },
  { menuItem: "Past Events", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];

const ProfileEvents = () => {
  const { id } = useParams();
  const [predicate, setPredicate] = useState("future");

  const { data: userEvents, isLoading: isLoadingEvents } = loadUserEvents(
    id || "",
    predicate
  );

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    setPredicate(panes[data.activeIndex as number].pane.key);
  };

  if (!userEvents) return <LoadingComponent />;
  return (
    <Tab.Pane loading={isLoadingEvents}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userEvents.map((activity: UserEvent) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {DateTime.fromISO(
                        activity.date as unknown as string
                      ).toFormat("dd-MM-yyyy")}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileEvents;
