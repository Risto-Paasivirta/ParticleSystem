import React, { useEffect, useState } from "react";
import "./ParticleSandbox.css";
import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";

const ParticleSandbox = (props) => {
  const { effects } = props;

  const particleSystem = ParticleSystem.fromObject({
    effects,
  });

  const [renderer, setRenderer] = useState(undefined);

  useEffect(() => {
    const container = document.getElementById("particleSandbox");
    const app = new PIXI.Application({ resizeTo: container });
    container.appendChild(app.view);
    // #region PIXI Renderer

    const loader = PIXI.Loader.shared;
    if (!loader.resources.spritesheet) {
      loader.add("spritesheet", "sprites/seepia_particles.json");
      loader.load();
    }

    const unusedSprites = [];
    const activeSprites = new Map();
    const registerParticleEffect = (effect) => {
      effect.addParticleListeners.push((particle) =>
        handleParticleAdd(effect, particle)
      );
      effect.destroyParticleListeners.push((particle) =>
        handleParticleDestroy(particle)
      );
    };
    const handleParticleAdd = (effect, particle) => {
      // Get sprite for rendering particle.
      let sprite = unusedSprites.pop();
      if (!sprite) {
        // No sprites, make a new one.
        sprite = new PIXI.Sprite();
        sprite.blendMode = PIXI.BLEND_MODES.ADD;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        app.stage.addChild(sprite);
      }
      // Prepare sprite for rendering.
      sprite.visible = true;

      const availableTextures = Object.keys(
        loader.resources?.spritesheet?.textures || {}
      );
      const texture = availableTextures[0];
      if (texture) {
        sprite.texture = PIXI.utils.TextureCache[texture];
      }

      // Save the relation between the particle and sprite.
      activeSprites.set(particle, sprite);
    };
    const handleParticleDestroy = (particle) => {
      // Get sprite that is used to render the destroyed particle.
      const sprite = activeSprites.get(particle);
      if (sprite) {
        // Remove sprite from rendering.
        sprite.visible = false;
        // Remove sprite and particle from list of active sprites.
        activeSprites.delete(particle);
        // Add sprite to list of unused sprites.
        unusedSprites.push(sprite);
      }
    };
    const updateRendering = () => {
      activeSprites.forEach((sprite, particle) => {
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
        sprite.rotation = particle.rotation;
      });
    };
    const reset = () => {
      const allParticles = Array.from(activeSprites.keys());
      allParticles.forEach(handleParticleDestroy);
    };
    // #endregion

    setRenderer({ app, registerParticleEffect, updateRendering, reset });

    return () => {
      app.destroy(true);
      loader.destroy();
    };
  }, []);

  useEffect(() => {
    if (!renderer) {
      return;
    }
    const { app, updateRendering, registerParticleEffect, reset } = renderer;

    reset();
    particleSystem.effects.forEach((effect) => registerParticleEffect(effect));

    const update = () => {
      const dt = app.ticker.elapsedMS / 1000;
      particleSystem.update(dt);
      updateRendering();
    };
    app.ticker?.add(update);

    return () => {
      app.ticker?.remove(update);
    };
  }, [particleSystem, renderer]);

  return <div className="particleSandbox" id="particleSandbox"></div>;
};

export default ParticleSandbox;