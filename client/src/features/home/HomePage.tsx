import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../users/LoginForm";

const HomePage = () => {
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

        <>
          <Header as="h2" inverted content={`Welcome`} />
          <Button as={Link} to="/activities" size="huge" inverted>
            Go to activities!
          </Button>
        </>

        <>
          <Button onClick={() => {}} size="huge" inverted>
            Login!
          </Button>
          <Button onClick={() => {}} size="huge" inverted>
            Register
          </Button>
        </>
      </Container>
    </Segment>
  );
};
export default HomePage;
