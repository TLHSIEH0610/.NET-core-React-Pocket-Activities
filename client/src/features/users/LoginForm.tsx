import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import StyledInput from "../../app/common/form/StyledTextInput";
import { login } from "./queries";
import { useAppDispatch } from "../../app/store/hooks";
import { setToken } from "./usersSlice";
import { closeModal } from "../../app/common/commonSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { mutateAsync: loginMut, isLoading: loginLoading } = login();
  //   const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        loginMut(values)
          .then((res) => {
            dispatch(setToken(res.token));
            dispatch(closeModal());
            navigate("/activities");
          })
          .catch((e) => {
            console.log(e);
            setErrors({ error: "Invalid email or password" });
          })
      }
    >
      {({ handleSubmit, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivities"
            color="blue"
            textAlign="center"
          />
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
            loading={loginLoading}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
