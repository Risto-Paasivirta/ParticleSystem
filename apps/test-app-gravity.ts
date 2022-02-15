// Test application

import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "initializers/randomVelocity";
import { LifeTimeRange } from "initializers/lifeTimeRange";
import { Position } from "types";
import { Gravity } from "modifiers/gravity";

const maxSprites = 200;

class ExampleTest {
    stage: PIXI.Container;
    particleSystem = new ParticleSystem();

    cachedSprites: PIXI.Sprite[] = [];

    center: Position = { x: 0, y: 0 };

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }

    init(): void {
        const generator = new PointGenerator(this.particleSystem);
        this.particleSystem.modules.push(generator);

        const initializer = new LifeTimeRange(this.particleSystem);
        this.particleSystem.modules.push(initializer);

        const randomVelocity = new RandomVelocity(this.particleSystem);
        randomVelocity.randomX = { min: -100, max: 100 };
        randomVelocity.randomY = { min: -100, max: -100 };
        this.particleSystem.modules.push(randomVelocity);

        const gravity = new Gravity(this.particleSystem);
        gravity.gravity = 0.2;
        this.particleSystem.modules.push(gravity);

        this.particleSystem.init();

        for (let i = 0; i < maxSprites; i++) {
            //the texture cache is automatically populated when the spritesheet was loaded
            //you can find the names of the sprites from "./assets/kenney_particlePack.json"
            const sprite = new PIXI.Sprite(PIXI.utils.TextureCache["circle_05.png"]);
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

const gameWidth = 800;
const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0x051033,
    width: gameWidth,
    height: gameHeight,
});

let example_test: ExampleTest;

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);
    example_test = new ExampleTest(app.stage);
    example_test.init();
    resizeCanvas();
    window.onresize = resizeCanvas;

    app.ticker.add(() => {
        const dt = app.ticker.elapsedMS / 1000;
        example_test.update(dt);
    });
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;
        loader.add("spritesheet", "./assets/kenney_particlePack.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);

        //fit the contents to the window
        const scale = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
        app.stage.scale.x = scale;
        app.stage.scale.y = scale;
    };

    resize();

    window.addEventListener("resize", resize);
}
