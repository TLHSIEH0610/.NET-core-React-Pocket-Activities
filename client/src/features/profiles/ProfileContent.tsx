import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";
import { useSearchParams } from "react-router-dom";
import ProfileFollowings from "./ProfileFollowings";
import ProfileAbout from "./ProfileAbout";
interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const [_, setSearchParams] = useSearchParams();
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings profile={profile} />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings profile={profile} />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) => {
        const { activeIndex, panes = [] } = data;
        const { menuItem } = panes[Number(activeIndex)];
        setSearchParams({ profileTab: menuItem.toLowerCase() });
      }}
    />
  );
};

export default ProfileContent;
