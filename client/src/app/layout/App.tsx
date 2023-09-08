import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import "./styles.css";
import { Container } from "semantic-ui-react";
function App() {
  const { pathname } = useLocation();

  return (
    <div>
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
    </div>
  );
}

export default App;
