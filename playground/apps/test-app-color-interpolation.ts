import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/core/particleSystem";
import { PointGenerator } from "modular-particle-system/core/generators/pointGenerator";
import { RandomVelocity } from "modular-particle-system/core/initializers/randomVelocity";
import { LifeTimeRange } from "modular-particle-system/core/initializers/lifeTimeRange";
import { LifeTimeDestructor } from "modular-particle-system/core/destructors/lifeTimeDestructor";
import { lerpColor } from "modular-particle-system/core/utilities";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const lifetimeRange = new LifeTimeRange(particleSystem);
lifetimeRange.min = 5;
lifetimeRange.max = 15;
particleSystem.modules.push(lifetimeRange);

const destructor = new LifeTimeDestructor(particleSystem);
particleSystem.modules.push(destructor);

const generator = new PointGenerator(particleSystem);
generator.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
particleSystem.modules.push(generator);

const randomVelocity = new RandomVelocity(particleSystem);
randomVelocity.randomX = { min: -20, max: 20 };
randomVelocity.randomY = { min: -20, max: 20 };
particleSystem.modules.push(randomVelocity);

// NOTE: This SHOULD be done in a module.
// "color over lifetime"
const alpha = 1;
setInterval(() => {
  particleSystem.particles.forEach((particle) => {
    const cycle = 5000;
    const asd = performance.now() % (cycle * 2);
    const lerpFactor = asd < cycle ? asd / cycle : 1 - (asd - cycle) / cycle;
    particle.scale = 0.4;
    particle.alpha = alpha;
    particle.color = lerpColor(
      { r: 1, g: 0, b: 0 },
      { r: 0, g: 1, b: 0 },
      lerpFactor
    );
  });
}, 1000 / 60);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
  renderer.setEffectTextures(PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
