import * as PIXI from "pixi.js";
import { ParticleSystem } from "@/core/particleSystem";
import { PointGenerator } from "@/core/generators/pointGenerator";
import { RandomVelocity } from "@/core/initializers/randomVelocity";
import { LifeTimeDestructor } from "@/core/destructors/lifeTimeDestructor";
import { LifeTimeRange } from "@/core/initializers/lifeTimeRange";
import { Renderer } from "./helpers/renderer/renderer";

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

const lifetime = new LifeTimeRange(particleSystem);
lifetime.min = 0.1;
lifetime.max = 1;
particleSystem.modules.push(lifetime);

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
