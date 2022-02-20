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
generator.interval = 0.005;
generator.position.x = window.innerWidth / 2;
generator.position.y = window.innerHeight / 2;
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

document.addEventListener("mousemove", (e) => {
    generator.position.x = e.clientX;
    generator.position.y = e.clientY;
});

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(
        PIXI.utils.TextureCache["light_01.png"],
        PIXI.utils.TextureCache["light_02.png"],
        PIXI.utils.TextureCache["light_03.png"],
        PIXI.utils.TextureCache["magic_01.png"],
        PIXI.utils.TextureCache["magic_02.png"],
        PIXI.utils.TextureCache["magic_03.png"],
        PIXI.utils.TextureCache["magic_04.png"],
        PIXI.utils.TextureCache["magic_05.png"],
    );
});
loader.load();
