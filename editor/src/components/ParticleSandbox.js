import React, { useEffect, useState } from "react";
import "./ParticleSandbox.css";
import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";

const ParticleSandbox = (props) => {
  const { effects } = props;

  const [renderer, setRenderer] = useState(undefined);

  const [devNoteState, setDevNoteState] = useState(false);

  const [visibleParticlesCount, setVisibleParticlesCount] = useState(0);

  useEffect(() => {
    const container = document.getElementById("particleSandbox");
    const app = new PIXI.Application({
      resizeTo: container,
      backgroundAlpha: 0,
    });
    container.appendChild(app.view);
    app.view.height = container.clientHeight;
    // #region PIXI Renderer

    const unusedSprites = [];
    const activeSprites = new Map();
    const registerParticleEffect = (particleEffect, effectInfo) => {
      particleEffect.addParticleListeners.push((particle) =>
        handleParticleAdd(effectInfo, particle)
      );
      particleEffect.destroyParticleListeners.push((particle) =>
        handleParticleDestroy(particle)
      );
    };
    const handleParticleAdd = (effectInfo, particle) => {
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
      const width = app.view.width;
      const height = app.view.height;
      const center = { x: width / 2, y: height / 2 };

      activeSprites.forEach((sprite, particle) => {
        sprite.x = center.x + particle.position.x;
        sprite.y = center.y + particle.position.y;
        sprite.scale.x = particle.scale;
        sprite.scale.y = particle.scale;
        sprite.alpha = particle.alpha;
        sprite.tint = PIXI.utils.rgb2hex([
          particle.color.r,
          particle.color.g,
          particle.color.b,
        ]);
        sprite.rotation = particle.rotation;
        sprite.texture = PIXI.utils.TextureCache[particle.texture];
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
    };
  }, []);

  useEffect(() => {
    if (!renderer) {
      return;
    }
    const { app, updateRendering, registerParticleEffect, reset } = renderer;

    reset();

    const particleSystem = ParticleSystem.fromObject(
      {
        effects,
      },
      { hideWarnings: true }
    );
    const particleEffects = particleSystem.effects;

    particleEffects.forEach((particleEffect, i) =>
      registerParticleEffect(particleEffect, effects[i])
    );

    const update = () => {
      const dt = app.ticker.elapsedMS / 1000;
      particleSystem.update(dt);
      updateRendering();

      const particlesCount = particleEffects.reduce(
        (prev, cur) => prev + cur.particles.length,
        0
      );
      setVisibleParticlesCount(particlesCount);
    };
    app.ticker?.add(update);

    return () => {
      app.ticker?.remove(update);
    };
  }, [effects, renderer]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDevNoteState(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="particleSandbox">
      <div className="particleSandbox-gridColumns">
        {new Array(10).fill(0).map((_, i) => (
          <div className="particleSandbox-gridColumn" key={`col${i}`}></div>
        ))}
      </div>
      <div className="particleSandbox-gridRows">
        {new Array(10).fill(0).map((_, i) => (
          <div className="particleSandbox-gridRow" key={`col${i}`}></div>
        ))}
      </div>
      <div className="particleSandbox-canvas" id="particleSandbox"></div>
      <div
        className={`particleSandbox-count  ${
          devNoteState ? "particleSandbox-devNotification-active" : ""
        }`}
        onClick={() => setDevNoteState(false)}
      >
        <p>
          {visibleParticlesCount}
          <b> particles</b>
        </p>
        <p></p>
      </div>

      <div
        className={`particleSandbox-devNotification ${
          devNoteState ? "particleSandbox-devNotification-active" : ""
        }`}
        onClick={() => setDevNoteState(false)}
      >
        <p>
          <b>Work in progress!</b>
        </p>
        <p>Some features are still unimplemented.</p>
      </div>
    </div>
  );
};

export default ParticleSandbox;
