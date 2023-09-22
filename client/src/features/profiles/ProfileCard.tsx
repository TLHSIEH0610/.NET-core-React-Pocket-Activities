import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { Link } from "react-router-dom";

interface Props {
  profile: Profile;
}

const ProfileCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={`/profiles/${profile.appUserId}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followerCount} followers
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;

const truncate = (str: string | undefined): string => {
  if (!str) return "";
  return str.length > 40 ? str.substring(0, 37) + "..." : str;
};
