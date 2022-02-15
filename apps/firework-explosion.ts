import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { LifeTimeDestructor } from "destructors/lifeTimeDestructor";
import { LifeTimeRange } from "initializers/lifeTimeRange";
import { Renderer } from "renderer/renderer";
import { RandomAngleVelocity } from "initializers/randomAngleVelocity";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
generator.interval = 0;
particleSystem.modules.push(generator);

const initializer = new LifeTimeRange(particleSystem);
initializer.lifetime = { min: 1.0, max: 3.0 };
particleSystem.modules.push(initializer);

const modifier = new RandomAngleVelocity(particleSystem);
particleSystem.modules.push(modifier);

const destructor = new LifeTimeDestructor(particleSystem);
particleSystem.modules.push(destructor);

const explodeAt = (x: number, y: number) => {
    generator.position.x = x;
    generator.position.y = y;
    for (let i = 0; i < 1000; i += 1) {
        generator.createParticle();
    }
};

setTimeout(() => {
    explodeAt(window.innerWidth / 2, window.innerHeight / 2);
    setInterval(() => {
        explodeAt(window.innerWidth / 2, window.innerHeight / 2);
    }, 4000);
}, 1000);

document.addEventListener("click", (e) => {
    explodeAt(e.clientX, e.clientY);
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
