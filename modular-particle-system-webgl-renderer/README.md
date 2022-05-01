Simple WebGL 2 renderer package for [`modular-particle-system`](https://www.npmjs.com/package/modular-particle-system).

Minified size 9 kB.
Capable of rendering up to 100 000 particles with smooth FPS (60 times per second).

Available as:

- IIFE

```html
<script src="https://cdn.jsdelivr.net/npm/modular-particle-system-webgl-renderer@1.0.0/index.iife.js"></script>
```

By using the IIFE build, you can even embed a fully functional particle system + renderer with pure HTML code, for example like [this](../examples/pure-html/README.md).

- NPM package

`npm install modular-particle-system-webgl-renderer`

NOTE: Usage from NPM package is currently untested.

```js
// IIFE
const { Renderer } = modularParticleSystemWebglRenderer;

// NPM
import { Renderer } from "modular-particle-system-webgl-renderer";

const imgCloudTexture = new Image();
imgCloudTexture.src = `my-assets/generic/cloud.png`;
const textures = {
  "generic/cloud.png": imgCloudTexture,
};

const renderer = Renderer({
  particleSystem,
  container: document.body,
  textures,
});
```

## Extended usage

### Renderer Options

#### **Required** `particleSystem`

Reference to a modular `ParticleSystem` object.

#### **Required** `container`

Reference to a `HTML` element that will contain the renderer.

#### **Required** `textures`

Texture sources for rendering particles.

This is a object where each property key describes the name of a texture and the value is a texture source. Several types of values are supported:

- `ArrayBufferView`
- `ImageData`
- `HTMLImageElement`
- `ImageBitmap`
- Or any other type supported by [WebGL texImage2D `pixels` parameter](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D).

#### Optional `autoUpdate`

If `omitted or `true, the renderer will automatically update the `ParticleSystem` between each frame.

#### Optional `coordinateSystem`

Defaults to `'pixels'`. Can be one of:

- `'pixels'`: Particle positions are in pixels, `{x:0, y: 0}` is at top left corner of `container`, positive X is right, positive Y is down..

- `'pixels-centered'`: Particle positions are in pixels, `{x:0, y: 0}` is at center of `container`, positive X is right, positive Y is down.

#### Optional `maxParticlesCount`

Defaults to `50000`, can be used to set a limit for particle rendering.
When number of particles exceeds this, the renderer will render some subset of the particles but not all.

#### Optional `loggingEnabled`

Defaults to `true`, which enables printing information to the console.
To disable all non-error console logging, set to `false`.

### Destroy Renderer

```js
const renderer = Renderer({ ... });
renderer.destroy()
```

## Known limitations

The renderer currently only supports rendering with 1 texture source.

The vision is to allow rendering with a relatively small number of relatively small textures, let's say 10 textures each smaller than 200x200px, since this is within the limits of keeping things simple and performant.

## Development

```bash
cd modular-particle-system-webgl-renderer
npm i
npm start
```
