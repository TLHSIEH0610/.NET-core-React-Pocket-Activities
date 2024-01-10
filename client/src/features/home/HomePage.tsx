import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../users/LoginForm";
import RegsiterForm from "../users/RegisterForm";
import { useAppDispatch } from "../../app/store/hooks";
import { openModal } from "../../app/common/commonSlice";
import { getUser } from "../users/queries";

const HomePage = () => {
  const { data: user } = getUser();
  const dispatch = useAppDispatch();
  const isLogin = Boolean(user && localStorage.getItem("jwt"));

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            src="/assets/logo.svg"
            alt="logo"
            style={{ marginBottom: 12, width: 600 }}
          />
        </Header>

        {isLogin ? (
          <>
            <Header as="h2" inverted content={`Welcome ${user?.displayName}`} />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Event!
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
