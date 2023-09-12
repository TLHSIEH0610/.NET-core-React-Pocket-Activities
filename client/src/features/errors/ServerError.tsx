import { Container, Header, Segment } from "semantic-ui-react";

export default function ServerError() {
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={"Internal Server Error"} />

      <Segment>
        <Header as="h4" content="Stack trace" color="teal" />
        <code style={{ marginTop: "10px" }}>{"todo: error.detail"}</code>
      </Segment>
    </Container>
  );
}
