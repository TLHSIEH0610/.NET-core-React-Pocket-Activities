import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEditForm from "./ProfileAboutEditForm";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { getUser } from "../users/queries";
import { Profile } from "../../app/models/profile";

const ProfileAbout = ({ profile }: { profile: Profile }) => {
  const { data: user } = getUser();
  const [editMode, setEditMode] = useState(false);

  if (!profile || !user) return <LoadingComponent />;

  const isCurrentUser = user?.username === profile.username;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width="16">
          <Header
            floated="left"
            icon="user"
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width="16">
          {editMode ? (
            <ProfileEditForm profile={profile} setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileAbout;
