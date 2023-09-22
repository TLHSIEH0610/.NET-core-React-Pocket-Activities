import { Tab, Grid, Header, Card } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
import { loadFollowings } from "./queries";
import { useSearchParams } from "react-router-dom";
import { Profile } from "../../app/models/profile";

interface Props {
  profile: Profile;
}

const ProfileFollowings = ({ profile }: Props) => {
  const [searchParams] = useSearchParams();

  const predicate = searchParams.get("profileTab") || "following";

  const { data: followings = [], isLoading: loadingFollowings } =
    loadFollowings(profile?.appUserId || "", predicate);

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width="16">
          <Header
            floated="left"
            icon="user"
            content={
              predicate === "following"
                ? `People ${profile?.displayName} is following`
                : `People following ${profile!.displayName}`
            }
          />
        </Grid.Column>
        <Grid.Column width="16">
          <Card.Group itemsPerRow="5">
            {followings.map((profile) => (
              <ProfileCard key={profile.appUserId} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileFollowings;
