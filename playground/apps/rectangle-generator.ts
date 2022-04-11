import { ParticleSystem } from 'modular-particle-system/particleSystem';
import { Renderer } from './helpers/renderer/renderer';
import * as PIXI from "pixi.js";
import { LifeTimeRange } from 'modular-particle-system/initializers/lifeTimeRange';
import { LifeTimeDestructor } from 'modular-particle-system/destructors/lifeTimeDestructor';
import { ShapeGenerator } from 'modular-particle-system/generators/shapeGenerator';

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
]

const rectangleGenerator = new ShapeGenerator(effect)
rectangleGenerator.shape = {
    type: 'rectangle',
    v1: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 },
    v2: { x: window.innerWidth / 2 - 10, y: window.innerHeight / 2 + 50 }
}
effect.modules.push(rectangleGenerator);

const rectangleEdgeGenerator = new ShapeGenerator(effect);
rectangleEdgeGenerator.shape = {
    type: 'rectangle',
    v1: { x: window.innerWidth / 2 + 100, y: window.innerHeight / 2 - 50 },
    v2: { x: window.innerWidth / 2 + 10, y: window.innerHeight / 2 + 50 }
}
rectangleEdgeGenerator.edgesOnly = true;
effect.modules.push(rectangleEdgeGenerator)

const lifetime = new LifeTimeRange(effect);
lifetime.min = 1.0;
lifetime.max = 2.5;
effect.modules.push(lifetime);

const destructor = new LifeTimeDestructor(effect);
effect.modules.push(destructor);