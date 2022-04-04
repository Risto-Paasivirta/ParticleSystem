import { ParticleSystem } from "modular-particle-system/particleSystem";
import { Renderer } from "./helpers/renderer/renderer";
import * as PIXI from "pixi.js";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";
const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.load();

const particleSystem = ParticleSystem.fromObject({
  effects: [
    {
      textures: [
        "smoke_01.png",
        "smoke_02.png",
        "smoke_03.png",
        "smoke_04.png",
        "smoke_05.png",
        "smoke_06.png",
        "smoke_07.png",
        "smoke_08.png",
        "smoke_09.png",
        "smoke_09.png",
      ],
      modules: [
        {
          moduleTypeId: "PointGenerator",
          position: { x: 500, y: 500 },
          interval: 0.1,
        },
        {
          moduleTypeId: "RandomVelocity",
          randomX: { min: -100, max: 100 },
          randomY: { min: -100, max: 100 },
        },
        {
          moduleTypeId: "AlphaOverLifetime",
          easing: "linear",
        },
      ],
    },
  ],
});
console.log(particleSystem);
const renderer = new Renderer(document.body, particleSystem);
