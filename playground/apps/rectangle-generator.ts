import { ParticleSystem } from 'modular-particle-system/particleSystem';
import { Renderer } from './helpers/renderer/renderer';
import * as PIXI from "pixi.js";
import { LifeTimeRange } from 'modular-particle-system/initializers/lifeTimeRange';
import { LifeTimeDestructor } from 'modular-particle-system/destructors/lifeTimeDestructor';
import { ShapeGenerator } from 'modular-particle-system/generators/shapeGenerator';

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();
const rectangleGenerator = new ShapeGenerator(effect)
rectangleGenerator.shape = {
    type: 'rectangle',
    v1: { x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 50 },
    v2: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 + 50 }
}
effect.modules.push(rectangleGenerator);

const rectangleEdgeGenerator = new ShapeGenerator(effect);
rectangleEdgeGenerator.shape = {
    type: 'rectangle',
    v1: { x: window.innerWidth / 2 + 300, y: window.innerHeight / 2 - 50 },
    v2: { x: window.innerWidth / 2 + 100, y: window.innerHeight / 2 + 50 }
}
rectangleEdgeGenerator.edgesOnly = true;
effect.modules.push(rectangleEdgeGenerator)

const lifetime = new LifeTimeRange(effect);
lifetime.min = 1.0;
lifetime.max = 2.5;
effect.modules.push(lifetime);

const destructor = new LifeTimeDestructor(effect);
effect.modules.push(destructor);

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(effect,
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