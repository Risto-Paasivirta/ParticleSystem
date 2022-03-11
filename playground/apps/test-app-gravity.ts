import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { RandomVelocity } from "modular-particle-system/initializers/randomVelocity";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { Gravity } from "modular-particle-system/modifiers/gravity";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const effect = particleSystem.addParticleEffect();

const generator = new PointGenerator(effect);
generator.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
effect.modules.push(generator);

const initializer = new LifeTimeRange(effect);
effect.modules.push(initializer);

const randomVelocity = new RandomVelocity(effect);
randomVelocity.randomX = { min: -50, max: 50 };
randomVelocity.randomY = { min: -100, max: -100 };
effect.modules.push(randomVelocity);

const gravity = new Gravity(effect);
gravity.strength = 0.2;
effect.modules.push(gravity);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(effect, PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
