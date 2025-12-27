import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./Card.tsx";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("JT");

  const addJtoName = () => {
    setName(name + "J");
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button
          onClick={() => {
            setCount((count) => count + 1);
            setName(name + "T")
          }}
        >
          count is {count}
        </button>
      </div>

      <div>
        <Card name={name} onButtonClick={addJtoName}/>
      </div>
    </>
  );
}

export default App;
