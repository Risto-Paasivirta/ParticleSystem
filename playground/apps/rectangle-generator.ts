import { RectangleGenerator } from 'modular-particle-system/generators/rectangleGenerator';
import { ParticleSystem } from 'modular-particle-system/particleSystem';
import { Renderer } from './helpers/renderer/renderer';
import * as PIXI from "pixi.js";
import { RectangleEdgeGenerator } from 'modular-particle-system/generators/rectangleEdgeGenerator';
import { LifeTimeRange } from 'modular-particle-system/initializers/lifeTimeRange';
import { LifeTimeDestructor } from 'modular-particle-system/destructors/lifeTimeDestructor';

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);
const effect = particleSystem.addParticleEffect();

const rectangleGenerator = new RectangleGenerator(effect)
rectangleGenerator.width = 400;
rectangleGenerator.height = 100;
const margin = 50;

rectangleGenerator.startPosition = {
	x: window.innerWidth / 2 - rectangleGenerator.width - margin, 
	y: window.innerHeight / 2 - rectangleGenerator.height / 2
}

console.log(rectangleGenerator.startPosition)

effect.modules.push(rectangleGenerator);

const rectangleEdgeGenerator = new RectangleEdgeGenerator(effect);
rectangleEdgeGenerator.width = 400;
rectangleEdgeGenerator.height = 100;

rectangleEdgeGenerator.startPosition = {
	x: window.innerWidth / 2 + margin, 
	y: window.innerHeight / 2 - rectangleEdgeGenerator.height / 2
}
console.log(rectangleEdgeGenerator.startPosition)


effect.modules.push(rectangleEdgeGenerator);

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