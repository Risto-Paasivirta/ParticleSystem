import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { Renderer } from "modular-particle-system-webgl-renderer";

function App() {
  useEffect(() => {
    const container = document.getElementById("particle-container");
    if (!container) {
      return;
    }

    const particleSystem = ParticleSystem.fromObject({
      effects: [
        {
          textures: ["ball.png"],
          modules: [
            {
              moduleTypeId: "AlphaRange",
              min: 0.3,
              max: 1,
            },
            {
              moduleTypeId: "RandomVelocity",
              randomX: {
                min: -40,
                max: 40,
              },
              randomY: {
                min: 40,
                max: 80,
              },
            },
            {
              moduleTypeId: "LifeTimeRange",
              min: 45,
              max: 45,
            },
            {
              moduleTypeId: "LifeTimeDestructor",
            },
            {
              moduleTypeId: "ShapeGenerator",
              interval: 0.1,
              shape: {
                type: "rectangle",
                v1: {
                  x: -200,
                  y: 0,
                },
                v2: {
                  x: 2000,
                  y: 0,
                },
              },
              bursts: [],
              edgesOnly: false,
            },
            {
              moduleTypeId: "RandomScale",
              min: 0.5,
              max: 0.8,
            },
          ],
        },
      ],
    });

    const imgParticleTexture = new Image();
    imgParticleTexture.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAYAAADRcLDBAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV8/pKIVBzsUdQhYnSyIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIjx4Lgf7+497t4B3kaFKYZ/AlBUU0/FY0I2tyoEXuFHGL0YwojIDC2RXszAdXzdw8PXuyjPcj/35+iT8wYDPALxHNN0k3iDeGbT1DjvE4dYSZSJz4nHdbog8SPXJYffOBdt9vLMkJ5JzROHiIViB0sdzEq6QjxNHJEVlfK9WYdlzluclUqNte7JXxjMqytprtMcRhxLSCAJARJqKKMCE1FaVVIMpGg/5uIftP1JcknkKoORYwFVKBBtP/gf/O7WKExNOknBGND1Ylkfo0BgF2jWLev72LKaJ4DvGbhS2/5qA5j9JL3e1iJHQP82cHHd1qQ94HIHCD9poi7ako+mt1AA3s/om3LAwC3Qs+b01trH6QOQoa6Wb4CDQ2CsSNnrLu/u7uzt3zOt/n4Ai6FysfEkTT0AAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfmBBgLHBJ1f0h7AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAjRJREFUWMPVlz1rFFEUhp+7mY0hCaaxCRo0wsZCQQsbrSSNTRoRCxux8VcIFoKNWFhZCIJ/QBBBsLKyMoUYEJUl+FEYdNH4sWw0u5vH5m5YsjiZ3cyO+sLAzgw79z33nPu+5wRyhBpCCKa977rd/F3iH0DYQdQlYAQYBZIYUAtoAs0QQjvrt/6vnVBHgEngIHAcOAHMAlPAONAG1oAPwDPgCfAcqKXVSdbFd6lH1RvqO7VtNrTUqnpZnYlB9L14os6pt9TvDo62+lSdV8v9EBhTF9RX6ob5YEU9k2lHIoEL6ifzR009FU9WagoW1I8OD0vqgTQSFXUxxxT8CdfUsR6dUEeBs8CxnYhYRlyMR71HrKaBc1H9ho1pYD6mPymppVgoc0ClQJE8HUVuPOmK/FBUxKJwOKotSTQhgL0FW8aebhKduhgvmEQZmOiQ2IgP1ws4FVsdvNQh0fH9LwXvxK/ouiSxEQF4E3elqB7jJ7AKkIQQNqJYVYE6sLsgEi+Br1vF6j3wusB0PAYaQKObxCpwvyACP4BHsRRamyRCCC3gAfC5ABIPgaUQgiGEHl+vAneHTKAGXA8hrKXZ+az6dkgW3lQvRcdOn6LU8/EPeaKtXlWzKbM6qt7MsblZj133RL/d9pR6p48Wf7sGtzxQBamT6hW1PsDiDfW2ui+PSTtRT6r31G/bpKipLscespJ14OlnDCwD+4Ej8ZqJ9t8AVuLxfgEsA/Udj35Zp/LU+aFPT//r+A3zBYDVEixFewAAAABJRU5ErkJggg==`;
    const textures = {
      "ball.png": imgParticleTexture,
    };

    const renderer = Renderer({
      particleSystem,
      textures,
      container,
      coordinateSystem: "pixels",
    });

    return () => {
      renderer.destroy();
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
      <div id="particle-container"></div>
    </div>
  );
}

export default App;
