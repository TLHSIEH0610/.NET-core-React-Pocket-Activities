import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import axios from "axios";
import "./styles.css";
import { Container } from "semantic-ui-react";
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {});
  });

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
