import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "initializers/randomVelocity";
import { LifeTimeDestructor } from "destructors/lifeTimeDestructor";
import { LifeTimeRange } from "initializers/lifeTimeRange";
import { Renderer } from "renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
particleSystem.modules.push(generator);

const initializer = new LifeTimeRange(particleSystem);
particleSystem.modules.push(initializer);

const modifier = new RandomVelocity(particleSystem);
particleSystem.modules.push(modifier);

const destructor = new LifeTimeDestructor(particleSystem);
particleSystem.modules.push(destructor);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(PIXI.utils.TextureCache["circle_01.png"]);
});
loader.load();
