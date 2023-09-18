import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../users/LoginForm";
import RegsiterForm from "../users/RegisterForm";
import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { openModal } from "../../app/common/commonSlice";

const HomePage = () => {
  const { user } = useAppSelector((state) => state.users);
  // const { user } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const isLogin = Boolean(user);

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.jpeg"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Activities
        </Header>

        {isLogin ? (
          <>
            <Header as="h2" inverted content={`Welcome ${user?.displayName}`} />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => dispatch(openModal(<LoginForm />))}
              size="huge"
              inverted
            >
              Login!
            </Button>
            <Button
              onClick={() => dispatch(openModal(<RegsiterForm />))}
              size="huge"
              inverted
            >
              Register
            </Button>{" "}
          </>
        )}
      </Container>
    </Segment>
  );
};
export default HomePage;
