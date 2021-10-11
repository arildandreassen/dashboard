import { useEffect, useState } from "react";
import "./App.css";
import { Bar } from "react-chartjs-2";
import { io } from "socket.io-client";
const socket = io();
function App() {
  const [graphData, setGraphdata] = useState([{ passed: 0, failed: 0 }]);

  useEffect(() => {
    socket.on("update", (data) => {
      setGraphdata(data);
    });
  }, []);

  const state = {
    labels: ["Cypress"],
    datasets: [
      {
        label: "Passing",
        backgroundColor: "rgba(0, 177, 106, 1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [graphData[0].passed],
      },
      {
        label: "Failing",
        backgroundColor: "rgba(192, 57, 43, 1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [graphData[0].failed],
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
        <button>click me</button>
        <div>
          <Bar height={500} width={1000} data={state} options={options} />
        </div>
      </header>
    </div>
  );
}

export default App;
