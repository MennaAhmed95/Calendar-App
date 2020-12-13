import "./App.css";
import Calender from "./components/Calender";

function App() {
  return (
    <div className="App">
      <div className="contain">
        <h1 className="text-centered">Calendar</h1>
      </div>
      <div>
        <Calender />
      </div>
    </div>
  );
}

export default App;
