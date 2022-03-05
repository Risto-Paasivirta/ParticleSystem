import { Particle } from "@/core/particle";
import { ParticleEffect } from "@/core/particleEffect";
import { ParticleSystem } from "@/core/particleSystem";
import * as PIXI from "pixi.js";

/**
 * `PIXI.js` based renderer class for particle systems.
 */
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
  private effectTextures: Map<ParticleEffect, PIXI.Texture[]> = new Map();

  constructor(container: HTMLElement, particleSystem: ParticleSystem) {
    this.container = container;
    this.particleSystem = particleSystem;

    this.app = new PIXI.Application({
      resizeTo: container,
    });
    container.appendChild(this.app.view);

    this.unusedSprites = [];
    this.activeSprites = new Map();
    particleSystem.effects.forEach((effect) =>
      this.registerParticleEffect(effect)
    );
    particleSystem.addParticleEffectListeners.push((effect) =>
      this.registerParticleEffect(effect)
    );

    this.setupUpdateRenderLoop();
  }

  // #region

  // #region User API

  /**
   * Set particle textures of a specific particle effect.
   *
   * Particle graphics are loaded in user code, using Pixie JS.
   *
   * If multiple textures are supplied, each particle will receive a random texture.
   *
   * This doesn't affect any particles that were created before calling the method.
   *
   * @param   textures    Any amount of PIXI textures.
   */
  public setEffectTextures(
    particleEffect: ParticleEffect,
    ...textures: PIXI.Texture[]
  ): void {
    this.effectTextures.set(particleEffect, textures);
  }

  // #endregion

  // #region Internal logic

  /**
   * Function that is called whenever a new particle effect is registed in the particle system.
   */
  private registerParticleEffect = (effect: ParticleEffect) => {
    effect.addParticleListeners.push((particle) =>
      this.handleParticleAdd(effect, particle)
    );
    effect.destroyParticleListeners.push((particle) =>
      this.handleParticleDestroy(effect, particle)
    );
  };

  /**
   * Function that is called whenever a new particle is added to the particle system.
   *
   * Prepares a PIXI sprite for rendering the particle.
   */
  private handleParticleAdd = (effect: ParticleEffect, particle: Particle) => {
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
    const effectTextures = this.effectTextures.get(effect);
    if (effectTextures) {
      // Assign sprite texture.
      sprite.texture =
        effectTextures[Math.round(Math.random() * (effectTextures.length - 1))];
    }
    // Save the relation between the particle and sprite.
    this.activeSprites.set(particle, sprite);
  };

  /**
   * Function that is called whenever a particle is destroyed in the particle system.
   *
   * Removes the PIXI sprite that was used to render the particle.
   */
  private handleParticleDestroy = (
    effect: ParticleEffect,
    particle: Particle
  ) => {
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
      sprite.alpha = particle.alpha;
      sprite.tint = PIXI.utils.rgb2hex([
        particle.color.r,
        particle.color.g,
        particle.color.b,
      ]);
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
    this.app.ticker.add(() => {
      const dt = this.app.ticker.elapsedMS / 1000;

      // Update particle system.
      this.particleSystem.update(dt);

      // Update renderer.
      this.updateRendering();
    });
  }

  // #endregion
}
