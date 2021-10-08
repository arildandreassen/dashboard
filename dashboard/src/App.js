import "./App.css";

function App() {
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
        </div>
      </header>
    </div>
  );
}

export default App;
