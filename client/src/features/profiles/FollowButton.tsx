import { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { getUser } from "../users/queries";
import { updateFollowing } from "./queries";

interface Props {
  profile: Profile;
}

const FollowButton = ({ profile }: Props) => {
  const { data: user } = getUser();
  const { mutateAsync: updateFollowingMut, isLoading } = updateFollowing();

  if (user?.appUserId === profile.appUserId) return null;

  function handleFollow(e: SyntheticEvent, id: string) {
    e.preventDefault();
    updateFollowingMut(id);
  }

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="blue"
          content={profile.following ? "Following" : "Not Following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden>
        <Button
          loading={isLoading}
          fluid
          basic
          color={profile.following ? "red" : "green"}
          content={profile.following ? "Unfollow" : "Follow"}
          onClick={(e) => handleFollow(e, profile.appUserId)}
        />
      </Reveal.Content>
    </Reveal>
  );
};

export default FollowButton;
