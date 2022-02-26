import * as PIXI from "pixi.js";
import { ParticleSystem } from "core/particleSystem";
import { PointGenerator } from "core/generators/pointGenerator";
import { Renderer } from "renderer/renderer";
import { AlphaDestructor } from "core/destructors/alphaDestructor";
import { AlphaRange } from "core/initializers/alphaRange";
import { AlphaOverLifetime } from "core/modifiers/alphaOverLifetime";
import { RandomVelocity } from "core/initializers/randomVelocity";
import { EasingFunctions } from "core/easing";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = ParticleSystem.fromObject({
    modules: [
        {
            moduleTypeId: "PointGenerator",
            position: { x: 500, y: 500 },
            interval: 0.1,
        },
        {
            moduleTypeId: "RandomVelocity",
            randomX: { min: -100, max: 100 },
            randomY: { min: -100, max: 100 },
        },
        {
            moduleTypeId: "AlphaOverLifetime",
            easing: "linear",
        },
    ],
});
console.log(particleSystem);
const renderer = new Renderer(document.body, particleSystem);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(
        PIXI.utils.TextureCache["smoke_01.png"],
        PIXI.utils.TextureCache["smoke_02.png"],
        PIXI.utils.TextureCache["smoke_03.png"],
        PIXI.utils.TextureCache["smoke_04.png"],
        PIXI.utils.TextureCache["smoke_05.png"],
        PIXI.utils.TextureCache["smoke_06.png"],
        PIXI.utils.TextureCache["smoke_07.png"],
        PIXI.utils.TextureCache["smoke_08.png"],
        PIXI.utils.TextureCache["smoke_09.png"],
        PIXI.utils.TextureCache["smoke_09.png"],
    );
});
loader.load();
