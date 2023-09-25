import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../../features/users/usersSlice";
import { getUser } from "../../features/users/queries";

const NavBar = () => {
  const { data: user } = getUser();
  const dispatch = useAppDispatch();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <Image
            src="/assets/logo.svg"
            alt="logo"
            style={{ marginRight: 10, width: 100 }}
          />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="activities/create"
            positive
            content="Create Activity"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            avatar
            spaced="right"
            src={user?.image || "/assets/user.png"}
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.appUserId}`}
                text="My Profile"
                icon="user"
              />
              <Dropdown.Item
                onClick={() => dispatch(logout())}
                text="Logout"
                icon="power"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
