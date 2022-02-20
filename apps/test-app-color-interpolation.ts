import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "initializers/randomVelocity";
import { LifeTimeRange } from "initializers/lifeTimeRange";
import { Renderer } from "renderer/renderer";
import { lerpColor } from "util";
import { LifeTimeDestructor } from "destructors/lifeTimeDestructor";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const lifetimeRange = new LifeTimeRange(particleSystem);
lifetimeRange.lifetime = { min: 5, max: 10 };
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
        particle.color = lerpColor({ r: 1, g: 0, b: 0, a: alpha }, { r: 0, g: 1, b: 0, a: alpha }, lerpFactor);
    });
}, 1000 / 60);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
