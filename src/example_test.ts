import * as PIXI from "pixi.js";
import { ParticleSystem } from "./ParticleSystemSrc/ParticleSystem";
import { PointGenerator } from "./ParticleSystemSrc/Generators/PointGenerator";
import { RandomVelocity } from "./ParticleSystemSrc/Modifiers/RandomVelocity";
import { LifeTimeDestructor } from "./ParticleSystemSrc/Destructors/LifeTimeDestructor";
import { LifeTimeRange } from "./ParticleSystemSrc/Initializers/LifeTimeRange";
import { position } from "./ParticleSystemSrc/Types";

const maxSprites = 200;

export class ExampleTest {
    stage: PIXI.Container;
    particleSystem = new ParticleSystem();

    cachedSprites: PIXI.Sprite[] = [];

    center: position = { x: 0, y: 0 };

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }

    init(): void {
        const generator = new PointGenerator(this.particleSystem);
        this.particleSystem.modules.push(generator);

        const initializer = new LifeTimeRange(this.particleSystem);
        this.particleSystem.modules.push(initializer);

        const modifier = new RandomVelocity(this.particleSystem);
        this.particleSystem.modules.push(modifier);

        const destructor = new LifeTimeDestructor(this.particleSystem);
        this.particleSystem.modules.push(destructor);

        this.particleSystem.init();

        for (let i = 0; i < maxSprites; i++) {
            //the texture cache is automatically populated when the spritesheet was loaded
            //you can find the names of the sprites from "./assets/kenney_particlePack.json"
            const sprite = new PIXI.Sprite(PIXI.utils.TextureCache["circle_01.png"]);
            sprite.blendMode = PIXI.BLEND_MODES.ADD;
            sprite.scale.set(0.2, 0.2);
            sprite.visible = false;
            this.stage.addChild(sprite);

            this.cachedSprites.push(sprite);
        }
    }

    update(dt: number) {
        this.particleSystem.update(dt);

        for (let i = 0; i < maxSprites; i++) {
            if (i >= this.particleSystem.particles.length) {
                this.cachedSprites[i].visible = false;
            } else {
                this.cachedSprites[i].visible = true;
                this.cachedSprites[i].x = this.particleSystem.particles[i].position.x + 500;
                this.cachedSprites[i].y = this.particleSystem.particles[i].position.y + 300;
            }
        }
    }
}
