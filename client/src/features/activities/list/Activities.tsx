import { useAppSelector } from "../../../app/store/hooks";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { loadActivities, deleteActivity } from "../queries";

const ActivityDashboard = () => {
  const acticities = useAppSelector((state) => state.acticities);

  const { data = [], isLoading } = loadActivities();
  const { mutate: deleteMutation } = deleteActivity();

  return (
    <Segment>
      <Item.Group divided>
        {data.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  loading={
                    isLoading
                    // && target === activity.id
                  }
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => deleteMutation(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityDashboard;
