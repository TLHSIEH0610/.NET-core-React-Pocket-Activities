import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { loadActivity } from "../queries";
import { dateToString } from "../../../app/common/utils";

const ActivityDetails = () => {
  const { id } = useParams();
  const { data: activity, isLoading } = loadActivity(id || "");

  if (isLoading || !activity) return "loading";

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{dateToString(activity.date)}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/activities/edit/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to="/activities"
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default ActivityDetails;
