import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import StyledInput from "../../app/common/form/StyledTextInput";
import * as Yup from "yup";
import { register } from "./queries";
import { useAppDispatch } from "../../app/store/hooks";
import { closeModal } from "../../app/common/commonSlice";
import { useNavigate } from "react-router-dom";
import { setToken } from "./usersSlice";

const initialValue = {
  displayName: "",
  username: "",
  email: "",
  password: "",
  error: null,
};

const RegsiterForm = () => {
  const { mutateAsync: registerMut, isLoading: registerLoading } = register();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values, { setErrors }) =>
        registerMut(values)
          .then((res) => {
            dispatch(closeModal());
            dispatch(setToken(res.token));
            navigate("/activities");
          })
          .catch((error) => setErrors({ error: error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ errors, isValid, dirty }) => (
        <Form className="ui form error" autoComplete="off">
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <StyledInput placeholder="Prefer Name" name="displayName" />
          <StyledInput placeholder="Username" name="username" />
          <StyledInput placeholder="Email" name="email" />
          <StyledInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            disabled={!isValid || !dirty || registerLoading}
            loading={registerLoading}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegsiterForm;
