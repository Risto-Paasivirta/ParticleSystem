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

### List of modules, their properties (cheat-sheet) and short descriptions

**Generators:**

<details><summary>CircleLoadingGenerator</summary>

- `interval: number`
- `bursts: Burst[]`
- `center: Position`
- `radius: number`
- `nextParticleAngle: number`
- `angleStep: number`  
  Generates particles in a way like loading animation. The particles move along the circumference of the circle. Interval of generating particles, position and radius of circle, the angle between the particles and anglestep can be changed with given properties above.

</details>

<details><summary>PointGenerator</summary>

- `interval: number`
- `bursts: Burst[]`
- `position: Position`  
  Generates particles from a single point. Interval and position of PointGenerator can be changed with given properties above

</details>

<details><summary>ShapeGenerator</summary>

- `interval: number`
- `bursts: Burst[]`
- `shape: Shape`
- `edgesOnly: Boolean`
Generates particles inside a chosen shape. Interval generating particles and shape of ShapeGenerator can be changed with given properties above. The shape affects the shape of the region in which the particles can be generated.
</details>

**Initializers:**

<details><summary>AlphaRange</summary>

- `min: number`
- `max: number`  
  Gives random degree of transparency between given min and max values.

</details>

<details><summary>LifetimeRange</summary>

- `min: number`
- `max: number`  
  Gives random lifetime range between min and max values as seconds.

</details>

<details><summary>RandomAngleVelocity</summary>

- `min: number`
- `max: number`  
  Gives random angle to velocity. Do not use with RandomVelocity.

</details>

<details><summary>RandomColor</summary>

- `palette: Color[]`  
  Gives random color between given RGB values in matrix.

</details>

<details><summary>RandomRotationalVelocity</summary>

- `min: number`
- `max: number`  
  Gives random rotational spinning velocity between given min and max values. Units are radians/second.

</details>

<details><summary>RandomScale</summary>

- `min: number`
- `max: number`  
  Scales size of particles between given min and max values.

</details>

<details><summary>RandomVelocity</summary>

- `randomX: Range`
- `randomY: Range`  
  Gives velocity between given values. The values are divided into minimum and maximum values in the x and y directions. Do not use with RandomAngleVelocity.

</details>

**Modifiers:**

<details><summary>AlphaOverLifetime</summary>

- `easing: EasingFunction`  
  Changes how transparency changes, for example fading or blinking animation.

</details>

<details><summary>DeaccelerationOverLifetime</summary>

- `easing: EasingFunction`  
  Decreases velocity of a particle over its lifetime.

</details>

<details><summary>Gravity</summary>

- `strength: number`  
  Gives one way gravity to particles.

</details>

<details><summary>GravityWithCenter</summary>

- `strength: number`
- `center: position`
- `maxPullStrengthDistance: number`
- `maxPullStrengthMultiplier: number`
- `minPullStrengthDistance: number`
- `minPullStrengthMultipler: number`  
  Gives planetary gravitation to particles based on given values.

</details>

**Destructors:**

<details><summary>AlphaDestructor</summary>

Destroys particles which alpha value is less or equal to zero.

</details>

<details><summary>LifetimeDestructor</summary>

Destroys particles which lifetime value is more or equal to particle lifetime.

</details>

<details><summary>OutsideBoundsDestructor</summary>

- `bounds: Shape`  
  Destroys particles when they are positioned outside a shape.

</details>

## Development

See separate README for development instructions [here](https://github.com/Risto-Paasivirta/ParticleSystem/blob/master/README-dev.md).

## License:

MIT-license
