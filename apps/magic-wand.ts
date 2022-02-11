// Test application

import * as PIXI from "pixi.js";
import { ParticleSystem } from "particleSystem";
import { PointGenerator } from "generators/pointGenerator";
import { RandomVelocity } from "modifiers/randomVelocity";
import { LifeTimeDestructor } from "destructors/lifeTimeDestructor";
import { LifeTimeRange } from "initializers/lifeTimeRange";

console.log("TEST 1");
document.body.style.margin = "0px 0px";
document.body.style.padding = "0px 0px";
document.body.style.overflow = "hidden";

const maxSprites = 10000;

class ExampleTest {
    stage: PIXI.Container;
    particleSystem = new ParticleSystem();

    cachedSprites: PIXI.Sprite[] = [];

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }

    init(): void {
        const generator = new PointGenerator(this.particleSystem);
        generator.interval = 0.005;
        generator.position.x = window.innerWidth / 2;
        generator.position.y = window.innerHeight / 2;
        this.particleSystem.modules.push(generator);

        const initializer = new LifeTimeRange(this.particleSystem);
        initializer.lifetime = { min: 0.1, max: 1 };
        this.particleSystem.modules.push(initializer);

        const modifier = new RandomVelocity(this.particleSystem);
        modifier.randomX = { min: -150, max: 150 };
        modifier.randomY = { min: -150, max: 150 };
        this.particleSystem.modules.push(modifier);

        const destructor = new LifeTimeDestructor(this.particleSystem);
        this.particleSystem.modules.push(destructor);

        this.particleSystem.init();

        const textures = [
            "light_01",
            "light_02",
            "light_03",
            "magic_05",
            "magic_04",
            "magic_03",
            "magic_02",
            "magic_01",
        ];

        for (let i = 0; i < maxSprites; i++) {
            //the texture cache is automatically populated when the spritesheet was loaded
            //you can find the names of the sprites from "./assets/kenney_particlePack.json"
            const sprite = new PIXI.Sprite(
                PIXI.utils.TextureCache[`${textures[Math.round(Math.random() * (textures.length - 1))]}.png`],
            );
            sprite.blendMode = PIXI.BLEND_MODES.ADD;
            sprite.scale.set(0.1, 0.1);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.visible = false;
            this.stage.addChild(sprite);

            this.cachedSprites.push(sprite);
        }

        document.addEventListener("mousemove", (e) => {
            generator.position.x = e.clientX;
            generator.position.y = e.clientY;
        });
    }

    update(dt: number) {
        this.particleSystem.update(dt);

        for (let i = 0; i < maxSprites; i++) {
            if (i >= this.particleSystem.particles.length) {
                this.cachedSprites[i].visible = false;
            } else {
                this.cachedSprites[i].visible = true;
                this.cachedSprites[i].x = this.particleSystem.particles[i].position.x;
                this.cachedSprites[i].y = this.particleSystem.particles[i].position.y;
            }
        }
    }
}

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

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
        // const scale = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
        // app.stage.scale.x = scale;
        // app.stage.scale.y = scale;
    };

    resize();

    window.addEventListener("resize", resize);
}
