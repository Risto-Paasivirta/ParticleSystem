import { ParticleSystem } from "particleSystem";
import * as PIXI from "pixi.js";

const MAX_SPRITES = 1000;

export class Renderer {
    private readonly container: HTMLElement;
    private readonly particleSystem: ParticleSystem;
    private readonly app: PIXI.Application;

    public readonly spriteCache: PIXI.Sprite[];

    constructor(container: HTMLElement, particleSystem: ParticleSystem) {
        this.container = container;
        this.particleSystem = particleSystem;

        this.app = new PIXI.Application({
            resizeTo: container,
        });
        container.appendChild(this.app.view);

        this.spriteCache = [];
        for (let i = 0; i < MAX_SPRITES; i += 1) {
            const sprite = new PIXI.Sprite();
            sprite.blendMode = PIXI.BLEND_MODES.ADD;
            sprite.visible = false;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this.app.stage.addChild(sprite);
            this.spriteCache.push(sprite);
        }

        this.setupUpdateRenderLoop();
    }

    /**
     * Update Pixie components to reflect current state of particle system.
     */
    private updateRendering() {
        const particles = this.particleSystem.particles;
        const particlesCount = particles.length;
        for (let i = 0; i < MAX_SPRITES; i++) {
            const sprite = this.spriteCache[i];
            if (i >= particlesCount) {
                sprite.visible = false;
            } else {
                sprite.visible = true;
                sprite.x = this.particleSystem.particles[i].position.x;
                sprite.y = this.particleSystem.particles[i].position.y;
            }
        }
    }

    /**
     * NOTE: At this time this exists mostly for development and manual testing purposes.
     *
     * It is currently unclear how the update and render cycles will be managed.
     *
     * Right now, this is automatically handled by renderer, meaning that testing apps should consider with updating particle system or rendering frames.
     */
    private setupUpdateRenderLoop() {
        this.app.ticker.add(() => {
            const dt = this.app.ticker.elapsedMS / 1000;

            // Update particle system.
            this.particleSystem.update(dt);

            // Update renderer.
            this.updateRendering();
        });
    }
}
