import * as PIXI from "pixi.js";
import { ParticleSystem } from "@/core/particleSystem";
import { PointGenerator } from "@/core/generators/pointGenerator";
import { AlphaDestructor } from "@/core/destructors/alphaDestructor";
import { AlphaRange } from "@/core/initializers/alphaRange";
import { AlphaOverLifetime } from "@/core/modifiers/alphaOverLifetime";
import { RandomVelocity } from "@/core/initializers/randomVelocity";
import { EasingFunctions } from "@/core/easing";
import { Renderer } from "./helpers/renderer/renderer";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
generator.position.x = window.innerWidth / 2;
generator.position.y = window.innerHeight / 2;

particleSystem.modules.push(generator);

const alphaRange = new AlphaRange(particleSystem);
particleSystem.modules.push(alphaRange);

const alphaOverLifeTimeModifier = new AlphaOverLifetime(particleSystem);
alphaOverLifeTimeModifier.easing = EasingFunctions.linear;
particleSystem.modules.push(alphaOverLifeTimeModifier);

const randomVelocityModifier = new RandomVelocity(particleSystem);
randomVelocityModifier.randomX = { min: -100, max: 100 };
randomVelocityModifier.randomY = { min: -100, max: 100 };
particleSystem.modules.push(randomVelocityModifier);

const destructor = new AlphaDestructor(particleSystem);
particleSystem.modules.push(destructor);

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
