import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { loadProfile } from "./queries";

const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile, isLoading: profileLoading } = loadProfile(id || "");

  if (profileLoading)
    return <LoadingComponent inverted content="Loading profile..." />;

  if (!profile) return <h2>Problem loading profile</h2>;

  return (
    <Grid>
      <Grid.Column width="16">
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;
