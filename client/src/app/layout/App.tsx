import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "10em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
