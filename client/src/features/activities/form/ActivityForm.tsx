import { Link, useParams } from "react-router-dom";
import { loadActivity, updateActivity, createActivity } from "../queries";
import { Button, Form, Segment } from "semantic-ui-react";

const initialActivity = {
  id: "",
  title: "",
  category: "",
  description: "",
  date: "",
  city: "",
  venue: "",
};

const ActivityForm = () => {
  const { id } = useParams();
  const { data: activity = initialActivity, isLoading } = loadActivity(
    id || ""
  );
  const { mutate: updateMutation } = updateActivity();
  const { mutate: createMutation } = createActivity();
  const handleSubmit = () => {};

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} name="title" />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
        />
        <Form.Input placeholder="City" value={activity.city} name="city" />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" />
        <Button
          loading={isLoading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default ActivityForm;
