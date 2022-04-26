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

NOTE: Usage from NPM package is untested.

```js
// IIFE
const { Renderer } = modularParticleSystemWebglRenderer;

// NPM
import { Renderer } from "modular-particle-system-webgl-renderer";

// NOTE: Currently renderer supports only 1 texture at a time. Several can be loaded, but only 1 can be rendered with.
const textures = {
  "generic/ball.png": loadTextureImage("generic/ball.png"),
  "generic/cloud.png": loadTextureImage("generic/cloud.png"),
};

const renderer = Renderer({
  particleSystem,
  container: document.body,
  textures,
});
```

## Development

```bash
cd modular-particle-system-webgl-renderer
npm i
npm start
```
