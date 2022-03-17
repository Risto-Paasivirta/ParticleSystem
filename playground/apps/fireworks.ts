import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { LifeTimeDestructor } from "modular-particle-system/destructors/lifeTimeDestructor";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { RandomAngleVelocity } from "modular-particle-system/initializers/randomAngleVelocity";
import { DeaccelerationOverLifetime } from "modular-particle-system/modifiers/deaccelerationOverLifetime";
import { AlphaOverLifetime } from "modular-particle-system/modifiers/alphaOverLifetime";
import { EasingFunctions } from "modular-particle-system/easing";
import { Renderer } from "./helpers/renderer/renderer";
import { AlphaDestructor } from "modular-particle-system/destructors/alphaDestructor";
import { RandomColor } from "modular-particle-system/initializers/randomColor";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const Firework = (x: number) => {
    const smoke = (() => {
        const effect = particleSystem.addParticleEffect();
        const generator = new PointGenerator(effect);
        generator.interval = 0.01;
        effect.modules.push(generator);
        const lifetime = new LifeTimeRange(effect);
        effect.modules.push(lifetime);
        lifetime.min = 0.5;
        lifetime.max = 1.0;
        const velocity = new RandomAngleVelocity(effect);
        effect.modules.push(velocity);
        const alpha = new AlphaOverLifetime(effect);
        effect.modules.push(alpha);
        const destructor = new AlphaDestructor(effect);
        effect.modules.push(destructor);
        const color = new RandomColor(effect)
        color.palette = [
            {r: 1,g: 0.8, b: 0},
            {r: 1,g: 0.2, b: 0}
        ]
        effect.modules.push(color)
        return { effect, generator };
    })();

    const explosion = (() => {
        const effect = particleSystem.addParticleEffect();
        const generator = new PointGenerator(effect);
        effect.modules.push(generator);
        generator.interval = 0;
        const lifetime = new LifeTimeRange(effect);
        effect.modules.push(lifetime);
        lifetime.min = 0.5;
        lifetime.max = 1.5;
        const velocity = new RandomAngleVelocity(effect);
        velocity.min = 50;
        velocity.max = 250;
        effect.modules.push(velocity);
        const deacceleration = new DeaccelerationOverLifetime(effect);
        effect.modules.push(deacceleration);
        const alpha = new AlphaOverLifetime(effect);
        effect.modules.push(alpha);
        const destructor = new AlphaDestructor(effect);
        effect.modules.push(destructor);
        const color = new RandomColor(effect)
        color.palette = [
            {r: 1,g: 0.8, b: 0},
            {r: 1,g: 0.2, b: 0}
        ]
        effect.modules.push(color)
        return { effect, generator };
    })();

    const position = { x, y: window.innerHeight };
    const velocity = { x: (Math.random() * 2 - 1) * 0.7, y: -5 + (Math.random() * 2 - 1) * 1.5 };
    const step = () => {
        position.x += velocity.x;
        position.y += velocity.y;
        velocity.y += 0.01;
        smoke.generator.position = position;
        explosion.generator.position = position;

        if (position.y > 250 || Math.random() > 0.05) {
            requestAnimationFrame(step);
        } else {
            // Explode.
            smoke.generator.interval = 0;
            for (let i = 0; i < 200; i += 1) {
                explosion.generator.generateParticle();
            }
        }
    };
    step();

    renderer.setEffectTextures(smoke.effect, PIXI.utils.TextureCache["generic/cloud_solid.png"]);
    renderer.setEffectTextures(explosion.effect, PIXI.utils.TextureCache["generic/cloud_solid.png"]);
};

const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.add("spritesheet2", "./assets/seepia_particles.json");
loader.onComplete.once(() => {
    Firework(window.innerWidth / 2);
    (async () => {
        while (true) {
            Firework(Math.random() * window.innerWidth);
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
        }
    })();
});
loader.load();
