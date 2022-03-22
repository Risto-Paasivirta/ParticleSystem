import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { Gravity } from "modular-particle-system/modifiers/gravity";
import { Renderer } from "./helpers/renderer/renderer";
import { ShapeGenerator } from "modular-particle-system/generators/shapeGenerator";
import { OutsideBoundsDestructor } from "modular-particle-system/destructors/outsideBoundsDestructor";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const effect = particleSystem.addParticleEffect();
const generator = new ShapeGenerator(effect)
generator.shape = {
    type: 'rectangle',
    v1: { x: 0, y: 0 },
    v2: { x: window.innerWidth, y: 0 }
}
effect.modules.push(generator)

const initializer = new LifeTimeRange(effect);
effect.modules.push(initializer);

const gravity = new Gravity(effect);
effect.modules.push(gravity);

const destructor = new OutsideBoundsDestructor(effect)
destructor.bounds = {type: 'rectangle', v1:{x:0,y:0},v2:{x:window.innerWidth, y:window.innerHeight}}
effect.modules.push(destructor)

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.onComplete.once(() => {
    renderer.setEffectTextures(effect, PIXI.utils.TextureCache["circle_05.png"]);
});
loader.load();
