import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { RandomVelocity } from "modular-particle-system/initializers/randomVelocity";
import { LifeTimeDestructor } from "modular-particle-system/destructors/lifeTimeDestructor";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";
const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.load();

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();
effect.sprites = [
  "light_01.png",
  "light_02.png",
  "light_03.png",
  "magic_01.png",
  "magic_02.png",
  "magic_03.png",
  "magic_04.png",
  "magic_05.png",
];

const generator = new PointGenerator(effect);
generator.interval = 0.005;
generator.position.x = window.innerWidth / 2;
generator.position.y = window.innerHeight / 2;
effect.modules.push(generator);

const lifetime = new LifeTimeRange(effect);
lifetime.min = 0.1;
lifetime.max = 1;
effect.modules.push(lifetime);

const modifier = new RandomVelocity(effect);
modifier.randomX = { min: -150, max: 150 };
modifier.randomY = { min: -150, max: 150 };
effect.modules.push(modifier);

const destructor = new LifeTimeDestructor(effect);
effect.modules.push(destructor);

document.addEventListener("mousemove", (e) => {
  generator.position.x = e.clientX;
  generator.position.y = e.clientY;
});
