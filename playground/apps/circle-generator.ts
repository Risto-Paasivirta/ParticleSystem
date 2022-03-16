// Test application
import { LifeTimeDestructor } from "modular-particle-system/destructors/lifeTimeDestructor";
import { CircleEdgeGenerator } from "modular-particle-system/generators/circleEdgeGenerator";
import { CircleGenerator } from "modular-particle-system/generators/circleGenerator";
import { CircleLoadingGenerator } from "modular-particle-system/generators/circleLoadingGenerator";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import * as PIXI from "pixi.js";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();

const circleGenerator = new CircleGenerator(effect);
circleGenerator.center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
effect.modules.push(circleGenerator);

const edgeGenerator = new CircleEdgeGenerator(effect);
edgeGenerator.center = { x: window.innerWidth / 4, y: window.innerHeight / 2 };
effect.modules.push(edgeGenerator);

const loadingGenerator = new CircleLoadingGenerator(effect);
loadingGenerator.center = {
  x: window.innerWidth / 3,
  y: window.innerHeight / 4,
};
effect.modules.push(loadingGenerator);

const lifetime = new LifeTimeRange(effect);
lifetime.min = 1.0;
lifetime.max = 2.5;
effect.modules.push(lifetime);

const destructor = new LifeTimeDestructor(effect);
effect.modules.push(destructor);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
  renderer.setEffectTextures(effect, PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
