import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import axios from "axios";
import "./styles.css";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      console.log(res.data);
    });
  });

  return <div>{pathname === "/" ? <HomePage /> : <Outlet />}</div>;
}

export default App;
