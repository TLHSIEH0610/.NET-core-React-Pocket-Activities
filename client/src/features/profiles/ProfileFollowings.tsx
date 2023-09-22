import { Tab, Grid, Header, Card } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
import { loadFollowings } from "./queries";
import { getUser } from "../users/queries";
import { useSearchParams } from "react-router-dom";

const ProfileFollowings = () => {
  const [searchParams] = useSearchParams();

  const { data: user } = getUser();

  const predicate = searchParams.get("profileTab") || "following";

  const { data: followings = [], isLoading: loadingFollowings } =
    loadFollowings(user?.appUserId || "", predicate);

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width="16">
          <Header
            floated="left"
            icon="user"
            content={
              predicate === "following"
                ? `People following ${user!.displayName}`
                : `People ${user?.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width="16">
          <Card.Group itemsPerRow="5">
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileFollowings;
