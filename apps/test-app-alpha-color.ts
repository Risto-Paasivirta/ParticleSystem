import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "modifiers/randomVelocity";
import { Position } from "types";
import { AlphaDestructor } from "destructors/alphaColorDestructor";

const maxSprites = 1000;

class ExampleTest {
    stage: PIXI.Container;
    particleSystem = new ParticleSystem();

    cachedSprites: PIXI.Sprite[] = [];

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }

    init(): void {
        const generator = new PointGenerator(this.particleSystem);
        this.particleSystem.modules.push(generator);

        const initializer = new AlphaColor(this.particleSystem);
        this.particleSystem.modules.push(initializer);

        const modifier = new RandomVelocity(this.particleSystem);
        this.particleSystem.modules.push(modifier);

        const destructor = new AlphaDestructor(this.particleSystem);
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
}
