import * as PIXI from "pixi.js";
import { ParticleSystem } from "core/particleSystem";
import { PointGenerator } from "core/generators/pointGenerator";
import { LifeTimeDestructor } from "core/destructors/lifeTimeDestructor";
import { LifeTimeRange } from "core/initializers/lifeTimeRange";
import { Renderer } from "renderer/renderer";
import { RandomAngleVelocity } from "core/initializers/randomAngleVelocity";
import { DeaccelerationOverLifetime } from "core/modifiers/deaccelerationOverLifetime";
import { AlphaOverLifetime } from "core/modifiers/alphaOverLifetime";
import { EasingFunctions } from "core/easing";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
generator.interval = 0;
particleSystem.modules.push(generator);

const initializer = new LifeTimeRange(particleSystem);
initializer.lifetime = { min: 1.0, max: 2.5 };
particleSystem.modules.push(initializer);

const modifier = new RandomAngleVelocity(particleSystem);
particleSystem.modules.push(modifier);

const deacceleration = new DeaccelerationOverLifetime(particleSystem);
particleSystem.modules.push(deacceleration);

const alpha = new AlphaOverLifetime(particleSystem);
alpha.easing = EasingFunctions.easeOutCirc;
particleSystem.modules.push(alpha);

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
