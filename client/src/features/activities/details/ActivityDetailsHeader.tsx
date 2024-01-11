import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { cancelActivityToggle, updateAttendeance } from "../queries";
import { DateTime } from "luxon";

const activityImageStyle = {
  filter: "brightness(60%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

const ActivityDetailedHeader = ({ activity }: Props) => {
  const {
    mutateAsync: updateAttendeanceMut,
    isLoading: updateAttendeanceLoading,
  } = updateAttendeance();
  const {
    mutateAsync: cancelActivityToggleMut,
    isLoading: cancelActivityLoading,
  } = cancelActivityToggle();
  const loading = updateAttendeanceLoading || cancelActivityLoading;

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image
          src={`/assets/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />

                {DateTime.fromISO(activity.date as unknown as string).toFormat(
                  "dd-MM-yyyy"
                )}

                <strong>
                  <Link to={`/profiles/${activity.hostUserId}`}>
                    Hosted by {activity.hostUsername}
                  </Link>
                </strong>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              color={activity.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                activity.isCancelled
                  ? "Re-activate activity"
                  : "Cancel Activity"
              }
              onClick={() => cancelActivityToggleMut(activity.id!)}
              loading={loading}
            />
            <Button
              as={Link}
              to={`/edit/${activity.id}`}
              color="orange"
              floated="right"
              disabled={activity.isCancelled}
            >
              Edit Event
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button
            onClick={() => updateAttendeanceMut(activity.id!)}
            loading={loading}
          >
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={activity.isCancelled}
            onClick={() => updateAttendeanceMut(activity.id!)}
            loading={loading}
            color="blue"
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailedHeader;
