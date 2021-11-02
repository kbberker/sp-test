import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="file-input">
        Please choose your log file:
        <input type="file" name="file-input" accept=".log" />
      </label>
      <div>
        <button type="button">Submit</button>
      </div>
    </div>
  );
}

export default App;
