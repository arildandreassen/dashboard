import { useState } from "react";
import "./App.css";

const ws = new WebSocket("ws://localhost:8082");

function App() {
  const [graphs, setGraphs] = useState();
  ws.addEventListener("open", () => {
    console.log("we are connected");
  });

  ws.addEventListener("message", ({ data }) => {
    // console.log(data);
    setGraphs(data);
  });

  const handleClick = () => {
    fetch("/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={handleClick}>refresh</button>
          <div>graph</div>
          <div>{graphs}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
