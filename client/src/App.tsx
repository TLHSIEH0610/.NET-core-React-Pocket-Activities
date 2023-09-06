import { useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      console.log(res.data);
    });
  });

  return <div></div>;
}

export default App;
