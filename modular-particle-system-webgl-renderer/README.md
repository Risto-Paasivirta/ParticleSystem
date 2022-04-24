WebGL 2 renderer for [`modular-particle-system`](https://www.npmjs.com/package/modular-particle-system).

Available as:

- IIFE

```html
<script src="https://cdn.jsdelivr.net/npm/modular-particle-system-webgl-renderer@1.0.0/index.iife.js"></script>
```

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
