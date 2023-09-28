import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import StyledInputArea from "../../app/common/form/StyledAreaInput";
import StyledInput from "../../app/common/form/StyledTextInput";
import * as Yup from "yup";
import { updateProfile } from "./queries";
import { Profile } from "../../app/models/profile";

interface Props {
  setEditMode: (editMode: boolean) => void;
  profile: Profile;
}

const ProfileEditForm = ({ setEditMode, profile }: Props) => {
  const { mutateAsync: updateProfileMut, isLoading } = updateProfile();

  return (
    <Formik
      initialValues={{
        displayName: profile?.displayName,
        bio: profile?.bio || "",
      }}
      onSubmit={(values) => {
        updateProfileMut(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isValid, dirty }) => (
        <Form className="ui form">
          <StyledInput placeholder="Display Name" name="displayName" />
          <StyledInputArea rows={3} placeholder="Add your bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isLoading}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEditForm;
