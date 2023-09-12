import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

function App() {
  const { pathname } = useLocation();

  return (
    <>
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
