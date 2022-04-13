import { AlphaDestructor } from "modular-particle-system/destructors/alphaDestructor";
import { EasingFunctions } from "modular-particle-system/easing";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { AlphaRange } from "modular-particle-system/initializers/alphaRange";
import { RandomVelocity } from "modular-particle-system/initializers/randomVelocity";
import { AlphaOverLifetime } from "modular-particle-system/modifiers/alphaOverLifetime";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import * as PIXI from "pixi.js";
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
];

const generator = new PointGenerator(effect);
generator.position.x = window.innerWidth / 2;
generator.position.y = window.innerHeight / 2;

effect.modules.push(generator);

const alphaRange = new AlphaRange(effect);
effect.modules.push(alphaRange);

const alphaOverLifeTimeModifier = new AlphaOverLifetime(effect);
alphaOverLifeTimeModifier.easing = EasingFunctions.linear;
effect.modules.push(alphaOverLifeTimeModifier);

const randomVelocityModifier = new RandomVelocity(effect);
randomVelocityModifier.randomX = { min: -100, max: 100 };
randomVelocityModifier.randomY = { min: -100, max: 100 };
effect.modules.push(randomVelocityModifier);

const destructor = new AlphaDestructor(effect);
effect.modules.push(destructor);
