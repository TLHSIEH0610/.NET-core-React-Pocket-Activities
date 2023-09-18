import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getUser } from "../../features/users/queries";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const { pathname } = useLocation();
  const { data: user, isLoading } = getUser();

  // todo: login persising
  useEffect(() => {
    if (user?.token) {
    }
  }, [user?.token]);

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container text style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
