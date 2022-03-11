import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { RandomVelocity } from "modular-particle-system/initializers/randomVelocity";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { LifeTimeDestructor } from "modular-particle-system/destructors/lifeTimeDestructor";
import { lerpColor } from "modular-particle-system/utilities";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();

const lifetimeRange = new LifeTimeRange(effect);
lifetimeRange.min = 5;
lifetimeRange.max = 15;
effect.modules.push(lifetimeRange);

const destructor = new LifeTimeDestructor(effect);
effect.modules.push(destructor);

const generator = new PointGenerator(effect);
generator.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
effect.modules.push(generator);

const randomVelocity = new RandomVelocity(effect);
randomVelocity.randomX = { min: -20, max: 20 };
randomVelocity.randomY = { min: -20, max: 20 };
effect.modules.push(randomVelocity);

// NOTE: This SHOULD be done in a module.
// "color over lifetime"
const alpha = 1;
setInterval(() => {
    effect.particles.forEach((particle) => {
        const cycle = 5000;
        const asd = performance.now() % (cycle * 2);
        const lerpFactor = asd < cycle ? asd / cycle : 1 - (asd - cycle) / cycle;
        particle.scale = 0.4;
        particle.alpha = alpha;
        particle.color = lerpColor({ r: 1, g: 0, b: 0 }, { r: 0, g: 1, b: 0 }, lerpFactor);
    });
}, 1000 / 60);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(effect, PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
