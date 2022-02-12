// Test application

import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "modifiers/randomVelocity";
import { LifeTimeDestructor } from "destructors/lifeTimeDestructor";
import { LifeTimeRange } from "initializers/lifeTimeRange";
import { Renderer } from "renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.padding = "0px 0px";
document.body.style.overflow = "hidden";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
generator.interval = 0.005;
generator.position.x = window.innerWidth / 2;
generator.position.y = window.innerHeight / 2;
// TODO: Instead of directly modifying array it should be more safer to add a method to particle system
particleSystem.modules.push(generator);

const initializer = new LifeTimeRange(particleSystem);
initializer.lifetime = { min: 0.1, max: 1 };
particleSystem.modules.push(initializer);

const modifier = new RandomVelocity(particleSystem);
modifier.randomX = { min: -150, max: 150 };
modifier.randomY = { min: -150, max: 150 };
particleSystem.modules.push(modifier);

const destructor = new LifeTimeDestructor(particleSystem);
particleSystem.modules.push(destructor);

particleSystem.init();

document.addEventListener("mousemove", (e) => {
    generator.position.x = e.clientX;
    generator.position.y = e.clientY;
});

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    console.log("loaded sprites");
    // TODO: Requires bit more thinking how to handle this nicely.
    renderer.spriteCache.forEach((sprite) => {
        sprite.texture = PIXI.utils.TextureCache["circle_01.png"];
    });
});
loader.load();
