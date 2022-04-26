// WebGL 2 renderer for "modular-particle-system" developed by Niilo Keinänen 2022

const defaultOpts = {
  autoUpdate: true,
};

/**
 * NOTE: This is buffer size, not amount of particles! Actual max particles count is considerably less than this
 */
const maxParticlesDataBufferSize = 500000;

export const Renderer = (opts) => {
  const { particleSystem, container, textures, autoUpdate } = Object.assign(
    {},
    defaultOpts,
    opts
  );

  // #region Init
  if (!particleSystem) {
    throw new Error(`particleSystem parameter must be supplied!`);
  }

  if (!container) {
    throw new Error(`container parameter must be supplied!`);
  }

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  container.append(canvas);

  const gl = canvas.getContext("webgl2");

  // #endregion

  // #region Init shaders and other static render resources

  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(
    gl.SRC_ALPHA,
    gl.ONE_MINUS_SRC_ALPHA,
    gl.ONE,
    gl.ONE_MINUS_SRC_ALPHA
  );

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSrc);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    const infoLog = gl.getShaderInfoLog(vertexShader);
    console.error(`Vertex shader compilation error\n${infoLog}`);
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSrc);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    const infoLog = gl.getShaderInfoLog(fragmentShader);
    console.error(`Fragment shader compilation error\n${infoLog}`);
  }

  const shader = gl.createProgram();
  gl.attachShader(shader, vertexShader);
  gl.attachShader(shader, fragmentShader);
  gl.linkProgram(shader);
  if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
    console.error(`Shader program link error\n${gl.getProgramInfoLog(shader)}`);
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  gl.useProgram(shader);

  const locViewportSize = gl.getUniformLocation(shader, "uViewportSizePx");
  const locTexture = gl.getUniformLocation(shader, "uTexture");

  const vertexBufferRectangle = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferRectangle);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -0.5, -0.5, 0.0, 0.0, -0.5, 0.5, 0.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.5, -0.5,
      1.0, 0.0,
    ]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(locGeometry);
  gl.vertexAttribDivisor(locGeometry, 0);
  gl.vertexAttribPointer(
    locGeometry,
    2,
    gl.FLOAT,
    false,
    4 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(locTexCoord);
  gl.vertexAttribDivisor(locTexCoord, 0);
  gl.vertexAttribPointer(
    locTexCoord,
    2,
    gl.FLOAT,
    false,
    4 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );

  const particlesDataBuffer = gl.createBuffer();
  let particlesDataBufferSize = 10000;
  let particlesData = new Float32Array(particlesDataBufferSize);
  gl.bindBuffer(gl.ARRAY_BUFFER, particlesDataBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, particlesData, gl.STREAM_DRAW);

  // #endregion

  // #region Load texture sources
  const loadedTextures = [];
  if (textures) {
    const keys = Object.keys(textures);
    keys.forEach((key) => {
      const value = textures[key];
      if (!value) {
        return;
      }
      console.time(`load texture ${key}`);
      try {
        if (value instanceof HTMLImageElement) {
          const loadImage = () => {
            const index = loadedTextures.length;
            value.removeEventListener("load", loadImage);
            const texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

            const level = 0;
            const internalFormat = gl.RGBA;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;
            const pxData = value;
            gl.texImage2D(
              gl.TEXTURE_2D,
              level,
              internalFormat,
              srcFormat,
              srcType,
              pxData
            );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_WRAP_S,
              gl.CLAMP_TO_EDGE
            );
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_WRAP_T,
              gl.CLAMP_TO_EDGE
            );
            loadedTextures.push({ texture, index, name: key });
            console.timeEnd(`load texture ${key}`);

            // Select active texture for rendering.
            let desiredTextureIndex = undefined;
            particleSystem.effects.forEach((effect) => {
              effect.textures.forEach((texture) => {
                const i = loadedTextures.findIndex(
                  (item) => item.name === texture
                );
                if (i >= 0) {
                  desiredTextureIndex = i;
                }
              });
            });
            if (desiredTextureIndex >= 0) {
              gl.uniform1i(locTexture, desiredTextureIndex);
            }
          };
          if (value.complete) {
            loadImage();
          } else {
            value.addEventListener("load", loadImage);
          }
        }
      } catch (e) {
        console.error(`Couldn't load texture ${key}\n\t${e.message}`);
      }
    });
  }
  // #endregion

  const render = () => {
    const bounds = container.getBoundingClientRect();
    const width = Math.floor(bounds.width);
    const height = Math.floor(bounds.height);
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const particles = particleSystem.effects
      .map((effect) => effect.particles)
      .flat();
    const particleCount = particles.length;
    const attributesPerParticle = 8;
    const particlesDataSize = attributesPerParticle * particleCount;

    if (
      particlesDataSize > particlesDataBufferSize &&
      particlesDataBufferSize < maxParticlesDataBufferSize
    ) {
      let increasedSize = Math.max(
        particlesDataSize,
        particlesDataBufferSize * 2
      );
      if (increasedSize > maxParticlesDataBufferSize) {
        console.warn(
          `Maximum particle data buffer size exceeded - some particles might not be rendered!`
        );
        increasedSize = maxParticlesDataBufferSize;
      }
      console.info(
        `Increasing particle data buffer size ${particlesDataBufferSize} -> ${increasedSize}`
      );
      particlesData = new Float32Array(increasedSize);
      particlesDataBufferSize = increasedSize;
    }

    const renderedParticlesCount = Math.min(
      particleCount,
      particlesDataBufferSize / attributesPerParticle
    );
    for (let i = 0; i < renderedParticlesCount; i += 1) {
      const particle = particles[i];
      const dataPos = i * attributesPerParticle;
      particlesData[dataPos + 0] = particle.position.x;
      particlesData[dataPos + 1] = particle.position.y;
      particlesData[dataPos + 2] = particle.color.r;
      particlesData[dataPos + 3] = particle.color.g;
      particlesData[dataPos + 4] = particle.color.b;
      particlesData[dataPos + 5] = particle.alpha;
      particlesData[dataPos + 6] = particle.rotation;
      particlesData[dataPos + 7] = particle.scale;
    }

    gl.uniform2f(locViewportSize, width, height);

    gl.bufferData(gl.ARRAY_BUFFER, particlesData, gl.STREAM_DRAW);

    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribDivisor(locPos, 1);
    gl.vertexAttribPointer(
      locPos,
      2,
      gl.FLOAT,
      false,
      attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
      0 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(locColor);
    gl.vertexAttribDivisor(locColor, 1);
    gl.vertexAttribPointer(
      locColor,
      4,
      gl.FLOAT,
      false,
      attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(locRotation);
    gl.vertexAttribDivisor(locRotation, 1);
    gl.vertexAttribPointer(
      locRotation,
      1,
      gl.FLOAT,
      false,
      attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
      6 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(locScale);
    gl.vertexAttribDivisor(locScale, 1);
    gl.vertexAttribPointer(
      locScale,
      1,
      gl.FLOAT,
      false,
      attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
      7 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, renderedParticlesCount);
  };

  particleSystem.update(0);

  let tPrev = window.performance.now();
  let rFrame = undefined;
  let particlesCountPrev = 0;
  const frame = () => {
    const tNow = window.performance.now();
    if (autoUpdate) {
      const tDelta = Math.min(tNow - tPrev, 10000);
      particleSystem.update(tDelta / 1000);
    }
    const particlesCount = particleSystem.effects.reduce(
      (prev, cur) => prev + cur.particles.length,
      0
    );

    if (particlesCountPrev !== 0 || particlesCount !== 0) {
      render();
    }

    tPrev = tNow;
    particlesCountPrev = particlesCount;
    rFrame = requestAnimationFrame(frame);
  };
  rFrame = requestAnimationFrame(frame);

  const rendererHandle = {
    destroy: () => {
      if (rFrame) {
        cancelAnimationFrame(rFrame);
        rFrame = undefined;
        container.removeChild(canvas);
      }
    },
  };
  return rendererHandle;
};

const locGeometry = 0;
const locTexCoord = 1;
const locPos = 2;
const locColor = 3;
const locRotation = 4;
const locScale = 5;

const vertexShaderSrc = `#version 300 es
precision mediump float;
precision mediump int;
layout(location=${locGeometry}) in vec2 aPosGeometry;
layout(location=${locTexCoord}) in vec2 aTexCoord;
layout(location=${locPos}) in vec2 aPos;
layout(location=${locColor}) in vec4 aColor;
layout(location=${locRotation}) in float aRotationRad;
layout(location=${locScale}) in float aScale;
uniform vec2 uViewportSizePx;
uniform sampler2D uTexture;
out vec4 vColor;
out vec2 vTexCoord;
void main(void) {
  ivec2 size = textureSize(uTexture, 0);
  float rotX = cos(aRotationRad);
  float rotY = sin(aRotationRad);
  vec2 rotGeometry = vec2(
    aPosGeometry.x * rotY + aPosGeometry.y * rotX,
    aPosGeometry.y * rotY - aPosGeometry.x * rotX
  );
  gl_Position = vec4(vec2(-1.0, 1.0) + (vec2(aPos.x, -aPos.y) + rotGeometry * vec2(size) * aScale) * 2.0 / uViewportSizePx, 0.0, 1.0);
  vColor = aColor;
  vTexCoord = aTexCoord;
}`;

const fragmentShaderSrc = `#version 300 es
precision mediump float;
precision mediump int;
in vec4 vColor;
in vec2 vTexCoord;
uniform sampler2D uTexture;
out vec4 fragColor;
void main(void) {
  vec4 texSample = texture(uTexture, vTexCoord);
  fragColor = vec4(vColor.rgb, vColor.a * texSample.a);
}`;
