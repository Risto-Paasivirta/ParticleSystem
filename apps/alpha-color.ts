import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { Renderer } from "renderer/renderer";
import { AlphaDestructor } from "destructors/alphaDestructor";
import { AlphaRange } from "initializers/alphaRange";
import { Alpha } from "modifiers/alpha";
import { RandomVelocity } from "modifiers/randomVelocity";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const generator = new PointGenerator(particleSystem);
generator.position.x = window.innerWidth / 2;
generator.position.y = window.innerHeight / 2;

particleSystem.modules.push(generator);

const initializer = new AlphaRange(particleSystem);
particleSystem.modules.push(initializer);

const alphaModifier = new Alpha(particleSystem);
particleSystem.modules.push(alphaModifier);

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
