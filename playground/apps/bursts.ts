import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { LifeTimeDestructor } from "modular-particle-system/destructors/lifeTimeDestructor";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { RandomAngleVelocity } from "modular-particle-system/initializers/randomAngleVelocity";
import { DeaccelerationOverLifetime } from "modular-particle-system/modifiers/deaccelerationOverLifetime";
import { AlphaOverLifetime } from "modular-particle-system/modifiers/alphaOverLifetime";
import { EasingFunctions } from "modular-particle-system/easing";
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
effect.textures = [
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
generator.interval = 0;
generator.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
generator.bursts = [
  { time: 1.0, count: 100 },
  { time: 2.0, count: 500 },
  { time: 4.0, count: 5000 },
];
effect.modules.push(generator);

const lifetime = new LifeTimeRange(effect);
lifetime.min = 1.0;
lifetime.max = 2.5;
effect.modules.push(lifetime);

const velocity = new RandomAngleVelocity(effect);
effect.modules.push(velocity);

const deacceleration = new DeaccelerationOverLifetime(effect);
effect.modules.push(deacceleration);

const alpha = new AlphaOverLifetime(effect);
alpha.easing = EasingFunctions.easeOutCirc;
effect.modules.push(alpha);

const destructor = new LifeTimeDestructor(effect);
effect.modules.push(destructor);
