import React, { useEffect, useState, useRef } from "react";
import "./ParticleSandbox.css";
import { Renderer } from "modular-particle-system-webgl-renderer";
import { ParticleSystem } from "modular-particle-system/particleSystem";

const ParticleSandbox = (props) => {
  const { effects } = props;

  const [textures, setTextures] = useState([]);

  const [particleSystem, setParticleSystem] = useState(undefined);

  const refRuntime = useRef(undefined);

  const refParticleCount = useRef(undefined);

  useEffect(() => {
    const particleSystem = ParticleSystem.fromObject(
      {
        effects,
      },
      { hideWarnings: true }
    );
    setParticleSystem(particleSystem);

    const textures = effects.map((effect) => effect.textures).flat();
    setTextures(textures);

    // Monitor runtime and particles count.
    let runTimeCounter = 0;
    let tPrevUpdate = window.performance.now();
    const update = () => {
      const tNow = window.performance.now();
      const dt = (tNow - tPrevUpdate) / 1000;
      runTimeCounter += dt;
      if (refRuntime.current)
        refRuntime.current.innerHTML = `Run time ${runTimeCounter.toFixed(2)}`;
      particleSystem.update(dt);

      const particlesCount = particleSystem.effects.reduce(
        (prev, cur) => prev + cur.particles.length,
        0
      );
      if (refParticleCount.current)
        refParticleCount.current.innerHTML = `Particles ${particlesCount}`;

      requestUpdate = requestAnimationFrame(update);
      tPrevUpdate = tNow;
    };
    let requestUpdate = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestUpdate);
      requestUpdate = undefined;
    };
  }, [effects]);

  useEffect(() => {
    if (!particleSystem) {
      return;
    }

    const container = document.getElementById("particleSandbox");
    const textureSources = {};
    textures.forEach((textureName) => {
      const img = new Image();
      img.src = `textures/${textureName}`;
      textureSources[textureName] = img;
    });

    const webglRenderer = Renderer({
      particleSystem,
      container,
      textures: textureSources,
      coordinateSystem: "pixels-centered",
      autoUpdate: false,
      loggingEnabled: false,
    });

    return () => {
      webglRenderer.destroy();
    };
  }, [particleSystem, textures]);

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
      <div className={`particleSandbox-stats`}>
        <span ref={refRuntime}>{`Run time`}</span>
        <span ref={refParticleCount}>{`Particles`}</span>
      </div>
    </div>
  );
};

export default ParticleSandbox;
