// Test application
import * as PIXI from "pixi.js";
import { ParticleSystem } from "core/particleSystem";
import { LifeTimeRange } from "core/initializers/lifeTimeRange";
import { LifeTimeDestructor } from "core/destructors/lifeTimeDestructor";
import { CircleGenerator } from "core/generators/circleGenerator";
import { CircleLoadingGenerator } from "core/generators/circleLoadingGenerator";
import { CircleEdgeGenerator } from "core/generators/circleEdgeGenerator";
import { Renderer } from "renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const circleGenerator = new CircleGenerator(particleSystem);
circleGenerator.center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
particleSystem.modules.push(circleGenerator);

const edgeGenerator = new CircleEdgeGenerator(particleSystem);
edgeGenerator.center = { x: window.innerWidth / 4, y: window.innerHeight / 2 };
particleSystem.modules.push(edgeGenerator);

const loadingGenerator = new CircleLoadingGenerator(particleSystem);
loadingGenerator.center = { x: window.innerWidth / 3, y: window.innerHeight / 4 };
particleSystem.modules.push(loadingGenerator);

const lifetime = new LifeTimeRange(particleSystem);
lifetime.min = 1.0;
lifetime.max = 2.5;
particleSystem.modules.push(lifetime);

const destructor = new LifeTimeDestructor(particleSystem);
particleSystem.modules.push(destructor);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
