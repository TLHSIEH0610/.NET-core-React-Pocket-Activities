import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
}

const ActivityDetailedSidebar = ({ activity: { attendees, host } }: Props) => {
  if (!attendees) return null;

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee, index) => (
            <Item style={{ position: "relative" }} key={index}>
              {attendee.username === host?.username && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={"/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.appUserId}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
                {attendee.following && (
                  <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
                )}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default ActivityDetailedSidebar;
