import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PathGenerator } from "modular-particle-system/generators/pathGenerator";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();
effect.textures = ["circle_05.png"];

const generator = new PathGenerator(effect);
generator.p1 = { x: 1000, y: 300 };
generator.p2 = { x: 1000, y: 500 };
generator.p3 = { x: 500, y: 500 };
generator.p4 = { x: 500, y: 800 };
generator.p5 = { x: 300, y: 800 };
generator.p6 = { x: 300, y: 1000 };
generator.padding = 10;
//generator.between = true;
effect.modules.push(generator);

const initializer = new LifeTimeRange(effect);
effect.modules.push(initializer);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.load();
