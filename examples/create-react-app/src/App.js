import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ParticleSystem } from "modular-particle-system/particleSystem";

function App() {
  useEffect(() => {
    const particleSystem = ParticleSystem.fromObject({
      effects: [
        {
          textures: [],
          modules: [
            {
              moduleTypeId: "PointGenerator",
              position: { x: 100, y: 100 },
              interval: 1,
            },
            {
              moduleTypeId: "RandomColor",
            },
          ],
        },
      ],
    });

    console.log(particleSystem);

    const interval = setInterval(() => {
      particleSystem.update(1 / 60);
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
