<!---
This README is displayed in the front page of GitHub page
--->

# Lightweight Particle System for TypeScript

The `modular-particle-system` package is an absolutely minimized particle system (**25.5 kB** minified!).

It is based around the idea of describing particle effects as combinations of different _modules_.

Each module adds a behavior to all particles of an effect.
For example, there is a module which randomizes the color of particles.
Or a module that assigns a random velocity to particles, and so on...
By combining these functionally simple modules, a wide variety of behaviors can be achieved.

**Interact with the particle system in an online editor playground at the URL below:**

[Online Playground](https://risto-paasivirta.github.io/ParticleSystem/)

This core package does NOT include any integration to a graphics framework.
It is designed to be completely free of any usage restrictions regarding a particular framework.

This repository does, however, include an [example integration with `PIXI.js`](https://github.com/Risto-Paasivirta/ParticleSystem/tree/master/playground/apps/helpers/renderer/renderer.ts)
It can be referenced to learn how the particle system can be integrated with a graphics framework.

## Installation and Usage

The library can be installed via `NPM`:

```bash
npm i modular-particle-system
```

The library is published as _EcmaScript_ module, which means that it can be used with any module bundler, such as _WebPack_, _Parcel_, _Rollup_, etc.

The syntax for importing parts of the library is as follows:

```js
import { ParticleSystem } from "modular-particle-system/particleSystem";
```

Usage examples can be inspired from the [development applications found in GitHub](https://github.com/Risto-Paasivirta/ParticleSystem/tree/master/playground/apps).

An alternative usage syntax is to load particle systems from `JSON` definition.
This is semi-typed but the module IDs and properties have to be manually looked up from the cheat-sheet below.

```ts
const particleSystem = ParticleSystem.fromObject({
  effects: [
    {
      modules: [
        {
          moduleTypeId: "PointGenerator",
          position: { x: 100, y: 100 },
          interval: 1,
        },
        {
          moduleTypeId: "RandomColor",
        },
      ],
    },
  ],
});
```

### List of modules and their properties (cheat-sheet)

**Generators:**

<details><summary>PointGenerator</summary>

- `interval: number`
- `position: Position`

</details>

<details><summary>ShapeGenerator</summary>

- `interval: number`
- `shape: Shape`

</details>

<details><summary>CircleGenerator</summary>

TODO

</details>

<details><summary>CircleExteriorGenerator</summary>

TODO

</details>

<details><summary>CircleLoadingGenerator</summary>

- `interval: number`
- `center: Position`
- `radius: number`
- `nextParticleAngle: number`
- `angleStep: number`

</details>

**Initializers:**

<details><summary>AlphaRange</summary>

- `min: number`
- `max: number`

</details>

<details><summary>LifetimeRange</summary>

- `min: number`
- `max: number`

</details>

<details><summary>RandomAngleVelocity</summary>

- `min: number`
- `max: number`

</details>

<details><summary>RandomColor</summary>

- `palette: Color[]`

</details>

<details><summary>RandomRotationalVelocity</summary>

- `min: number`
- `max: number`

</details>

<details><summary>RandomScale</summary>

- `min: number`
- `max: number`

</details>

<details><summary>RandomVelocity</summary>

- `randomX: Range`
- `randomY: Range`

</details>

**Modifiers:**

<details><summary>AlphaOverLifetime</summary>

- `easing: EasingFunction`

</details>

<details><summary>DeaccelerationOverLifetime</summary>

- `easing: EasingFunction`

</details>

<details><summary>Gravity</summary>

- `strength: number`

</details>

**Destructors:**

<details><summary>AlphaDestructor</summary>

</details>

<details><summary>LifetimeDestructor</summary>

</details>

<details><summary>OutsideBoundsDestructor</summary>

- `bounds: Shape`

</details>

## Development

See separate README for development instructions [here](https://github.com/Risto-Paasivirta/ParticleSystem/blob/master/README.md).

## License:

MIT-license
