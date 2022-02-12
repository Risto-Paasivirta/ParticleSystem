import { Particle } from "particle";
import { ParticleSystem } from "particleSystem";
import * as PIXI from "pixi.js";

export class Renderer {
    private readonly container: HTMLElement;
    private readonly particleSystem: ParticleSystem;
    private readonly app: PIXI.Application;

    public readonly unusedSprites: PIXI.Sprite[];
    public readonly activeSprites: Map<Particle, PIXI.Sprite>;

    /**
     * User configuration for textures used for rendering the particle system.
     *
     * When there are multiple textures, each particle will use a random one.
     */
    private textures: PIXI.Texture[] | undefined;

    constructor(container: HTMLElement, particleSystem: ParticleSystem) {
        this.container = container;
        this.particleSystem = particleSystem;

        this.app = new PIXI.Application({
            resizeTo: container,
        });
        container.appendChild(this.app.view);

        this.unusedSprites = [];
        this.activeSprites = new Map();
        particleSystem.addParticleListeners.push(this.handleParticleAdd);
        particleSystem.destroyParticleListeners.push(this.handleParticleDestroy);

        this.setupUpdateRenderLoop();
    }

    // #region

    // #region User API

    /**
     * Set particle textures.
     *
     * Particle graphics are loaded in user code, using Pixie JS.
     *
     * If multiple textures are supplied, each particle will receive a random texture.
     *
     * This doesn't affect any particles that were created before calling the method.
     *
     * @param   textures    Any amount of PIXI textures.
     */
    public setEffectTextures(...textures: PIXI.Texture[]): void {
        this.textures = textures;
    }

    // #endregion

    // #region Internal logic

    /**
     * Function that is called whenever a new particle is added to the particle system.
     *
     * Prepares a PIXI sprite for rendering the particle.
     */
    private handleParticleAdd = (particle: Particle) => {
        // Get sprite for rendering particle.
        let sprite = this.unusedSprites.pop();
        if (!sprite) {
            // No sprites, make a new one.
            sprite = new PIXI.Sprite();
            sprite.blendMode = PIXI.BLEND_MODES.ADD;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this.app.stage.addChild(sprite);
        }
        // Prepare sprite for rendering.
        sprite.visible = true;
        if (this.textures) {
            // Assign sprite texture.
            sprite.texture = this.textures[Math.round(Math.random() * (this.textures.length - 1))];
        }
        // Save the relation between the particle and sprite.
        this.activeSprites.set(particle, sprite);
    };

    /**
     * Function that is called whenever a particle is destroyed in the particle system.
     *
     * Removes the PIXI sprite that was used to render the particle.
     */
    private handleParticleDestroy = (particle: Particle) => {
        // Get sprite that is used to render the destroyed particle.
        const sprite = this.activeSprites.get(particle);
        if (sprite) {
            // Remove sprite from rendering.
            sprite.visible = false;
            // Remove sprite and particle from list of active sprites.
            this.activeSprites.delete(particle);
            // Add sprite to list of unused sprites.
            this.unusedSprites.push(sprite);
        }
    };

    /**
     * Update Pixie components to reflect current state of particle system.
     */
    private updateRendering() {
        this.activeSprites.forEach((sprite, particle) => {
            sprite.x = particle.position.x;
            sprite.y = particle.position.y;
            sprite.scale.x = particle.scale;
            sprite.scale.y = particle.scale;
        });
    }

    /**
     * NOTE: At this time this exists mostly for development and manual testing purposes.
     *
     * It is currently unclear how the update and render cycles will be managed.
     *
     * Right now, this is automatically handled by renderer, meaning that testing apps should consider with updating particle system or rendering frames.
     */
    private setupUpdateRenderLoop() {
        let isFirstFrame = true;

        this.app.ticker.add(() => {
            const dt = this.app.ticker.elapsedMS / 1000;

            if (isFirstFrame) {
                // Initialize particle system.
                this.particleSystem.init();
                isFirstFrame = false;
            }

            // Update particle system.
            this.particleSystem.update(dt);

            // Update renderer.
            this.updateRendering();
        });
    }

    // #endregion
}
