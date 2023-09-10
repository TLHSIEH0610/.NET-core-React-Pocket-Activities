import { Link, useParams } from "react-router-dom";
import { loadActivity, updateActivity, createActivity } from "../queries";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import StyledInput from "../../../app/common/form/StyledTextInput";
import StyledInputArea from "../../../app/common/form/StyledAreaInput";
import StyledSelector from "../../../app/common/form/StyledSelector";
import StyledDatePicker from "../../../app/common/form/StyledDatePicker";
import { object, string } from "yup";
import { Activity } from "../../../app/models/activity";
import { DateTime } from "luxon";

const initialActivity = {
  id: "",
  title: "",
  category: "",
  description: "",
  date: "",
  city: "",
  venue: "",
};

const categoryOptions = [
  { text: "City Safari", value: "citySafari" },
  { text: "Quartz Terrarium", value: "quartzTerrarium" },
  { text: "Pyrite Sands", value: "pyriteSands" },
  { text: "Malachite Wilderness", value: "malachiteWilderness" },
];

const validationSchema = object({
  title: string().required("The event title is required"),
  category: string().required("The event category is required"),
  description: string().required(),
  date: string().required("Date is required"),
  venue: string().required(),
  city: string().required(),
});

const ActivityForm = () => {
  const { id } = useParams();
  const { data: activity = initialActivity, isLoading: loadingActivity } =
    loadActivity(id || "");
  const { mutate: updateMutation } = updateActivity();
  const { mutate: createMutation } = createActivity();
  const handleFormSubmit = async (values: Activity) => {
    console.log(values);
  };

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form className="ui form" autoComplete="off">
            <StyledInput name="title" placeholder="Title" />
            <StyledInputArea
              rows={3}
              name="description"
              placeholder="Description"
            />
            <StyledSelector
              options={categoryOptions}
              name="category"
              placeholder="category"
            />
            <StyledDatePicker
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <Header content="Location Details" sub color="teal" />
            <StyledInput name="venue" placeholder="Venue" />
            <StyledInput name="city" placeholder="city" />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loadingActivity}
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
        )}
      </Formik>
    </Segment>
  );
};
export default ActivityForm;
