import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "modifiers/randomVelocity";
import { LifeTimeRange } from "initializers/lifeTimeRange";
import { Renderer } from "renderer/renderer";
import { OutsideBoundsDestructor } from "destructors/outsideBoundsDestructor";
import { Shapes } from "shapes/shapes";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
generator.position = { x: 200, y: 200 };
generator.interval = 0.01;
particleSystem.modules.push(generator);

const initializer = new LifeTimeRange(particleSystem);
particleSystem.modules.push(initializer);

const modifier = new RandomVelocity(particleSystem);
modifier.randomX = { min: -100, max: 100 };
modifier.randomY = { min: -100, max: 100 };
particleSystem.modules.push(modifier);

const destructor = new OutsideBoundsDestructor(
    particleSystem,
    Shapes.Triangle({ x: 100, y: 400 }, { x: 300, y: 400 }, { x: 200, y: 0 }),
);
particleSystem.modules.push(destructor);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(PIXI.utils.TextureCache["circle_01.png"]);
});
loader.load();
