import { Renderer } from "./renderer.js";
import { ParticleSystem } from "modular-particle-system/particleSystem.js";

const particleSystem = ParticleSystem.fromObject({
  effects: [
    {
      textures: ["generic/ball.png"],
      modules: [
        {
          moduleTypeId: "Gravity",
          strength: 500,
          minPullStrengthMultiplier: 0.2,
          maxPullStrengthMultiplier: 1,
          minPullStrengthDistance: 500,
          maxPullStrengthDistance: 100,
        },
        {
          moduleTypeId: "PointGenerator",
          interval: 0.01,
          position: {
            x: window.innerWidth / 2,
            y: window.innerHeight,
          },
          bursts: [],
        },
        {
          moduleTypeId: "RandomVelocity",
          randomX: {
            min: -90,
            max: 90,
          },
          randomY: {
            min: -1000,
            max: -500,
          },
        },
        {
          moduleTypeId: "RandomScale",
          min: 0.1,
          max: 0.3,
        },
        {
          moduleTypeId: "RandomColor",
          palette: [
            {
              r: 1,
              g: 0,
              b: 0,
            },
            {
              r: 1,
              g: 1,
              b: 0,
            },
          ],
          interpolate: true,
        },
        {
          moduleTypeId: "LifeTimeRange",
          min: 10,
          max: 10,
        },
        {
          moduleTypeId: "LifeTimeDestructor",
        },
      ],
    },
  ],
});

document.body.style.width = "100vw";
document.body.style.height = "100vh";
document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = "black";

const loadTextureImage = (assetName) => {
  const img = new Image();
  img.src = `assets/${assetName}`;
  return img;
};
// NOTE: Currently renderer supports only 1 texture at a time. Several can be loaded, but only 1 can be rendered with.
const textures = {
  "generic/ball.png": loadTextureImage("generic/ball.png"),
  "generic/cloud.png": loadTextureImage("generic/cloud.png"),
};

const renderer = Renderer({
  particleSystem,
  container: document.body,
  textures,
});

(() => {
  let frames = 0;
  let tPrevMeasure = window.performance.now();
  const recordFrame = () => {
    frames += 1;
    requestAnimationFrame(recordFrame);
  };
  recordFrame();
  setInterval(() => {
    const tNow = window.performance.now();
    const fps = 1000 / ((tNow - tPrevMeasure) / frames);
    console.log(`FPS: ${fps.toFixed(1)}`);
    frames = 0;
    tPrevMeasure = tNow;
  }, 5000);
})();
