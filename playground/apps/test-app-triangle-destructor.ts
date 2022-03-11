import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { RandomVelocity } from "modular-particle-system/initializers/randomVelocity";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { OutsideBoundsDestructor } from "modular-particle-system/destructors/outsideBoundsDestructor";
import { Shapes } from "modular-particle-system/shapes/shapes";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();

const generator = new PointGenerator(effect);
generator.position = { x: 200, y: 200 };
generator.interval = 0.01;
effect.modules.push(generator);

const initializer = new LifeTimeRange(effect);
effect.modules.push(initializer);

const modifier = new RandomVelocity(effect);
modifier.randomX = { min: -100, max: 100 };
modifier.randomY = { min: -100, max: 100 };
effect.modules.push(modifier);

const destructor = new OutsideBoundsDestructor(
    effect,
    Shapes.Triangle({ x: 100, y: 400 }, { x: 300, y: 400 }, { x: 200, y: 0 }),
);
effect.modules.push(destructor);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(effect, PIXI.utils.TextureCache["circle_01.png"]);
});
loader.load();
