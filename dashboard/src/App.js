import { useState } from "react";
import "./App.css";
import { Bar } from "react-chartjs-2";
const ws = new WebSocket("ws://localhost:8082");
function App() {
  const [data, setData] = useState(1);

  ws.addEventListener("message", ({ message }) => {
    console.log(data);
    // const newValue = data + 1;/
    // console.log(newValue);
    // setData(data + 1);
  });

  // ws.addEventListener("open", () => {
  //   console.log("we are connected");
  // });

  // ws.addEventListener("message", ({ data }) => {
  //   // console.log(data);
  //   const jsonData = JSON.parse(data);
  //   // console.log(data);
  //   // console.log(graphs);
  //   // console.log(graphs);
  //   console.log(graphs);
  //   // console.log(jsonData);
  //   const passed = graphs[0].passed;
  //   const newPassed = passed + 1;
  //   const failed = graphs[0].failed + 1;
  //   const newFailed = failed + 1;
  //   console.log(graphs);
  //   // setGraphs([{ passed: newPassed, failed: newFailed }]);

  //   // setGraphs(jsonData);
  // });

  // const handleClick = () => {
  //   fetch("/results", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  const state = {
    labels: ["Cypress"],
    datasets: [
      {
        label: "Passing",
        backgroundColor: "rgba(0, 177, 106, 1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [10],
      },
      {
        label: "Failing",
        backgroundColor: "rgba(192, 57, 43, 1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [5],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <button onClick={handleClick}></button> */}
        <div>
          <Bar height={500} width={1000} data={state} options={options} />
        </div>
      </header>
    </div>
  );
}

export default App;
