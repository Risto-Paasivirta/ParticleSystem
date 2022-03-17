import { ParticleSystem } from "modular-particle-system/particleSystem";
import { Renderer } from "./helpers/renderer/renderer";
import * as PIXI from "pixi.js";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = ParticleSystem.fromObject({
    effects: [
        {
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
            ]
        }
    ],
});
console.log(particleSystem);
const renderer = new Renderer(document.body, particleSystem);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(
        particleSystem.effects[0],
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
