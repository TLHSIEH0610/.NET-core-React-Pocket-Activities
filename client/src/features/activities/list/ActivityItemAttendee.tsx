import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

const styles = {
  borderColor: "orange",
  borderWidth: 3,
};

interface Props {
  attendees: Profile[];
}

const ActivityListAttendee = ({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item as={Link} to={`/profile/${attendee.appUserId}`}>
              <Image
                size="mini"
                style={attendee.following ? styles : null}
                bordered
                circular
                src={attendee.image || `/assets/user.png`}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default ActivityListAttendee;
