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
It is designed to be completely free of any usage restrictions regarding a particular framework. Some existing references/packages exist for existing integrations to some graphics frameworks, see [this section](#graphics-integrations).

## Installation

The package is available as:

- IIFE

```html
<script src="https://cdn.jsdelivr.net/npm/modular-particle-system-webgl-renderer@1.0.0/index.iife.js"></script>
```

```js
const { ParticleSystem } = modularParticleSystem;
```

- NPM package

`npm install modular-particle-system`

```js
import { ParticleSystem } from "modular-particle-system/particleSystem";
```

## Graphics integrations

The current development setup for the particle system is based on `PIXI.js`. This can be used as a reference of how the particle system can be integrated with any graphics framework. See [this file](<(https://github.com/Risto-Paasivirta/ParticleSystem/tree/master/playground/apps/helpers/renderer/renderer.ts)>) for the relevant source code.

TODO: Webgl renderer

## Usage

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

**EasingFunctions:**

<details><summary>Easing Functions to use with AlphaOverLifetime and DeaccelerationOverLifetime </summary>

- `EasingFunctions.linear`
- `EasingFunctions.easeOutSine`
- `EasingFunctions.easeOutCubic`
- `EasingFunctions.easeOutExpo`
- `EasingFunctions.easeOutCirc`
- `EasingFunctions.easeOutBack`
- `EasingFunctions.easeElastic`
  These are based on mathematical formulas that can be used to fade the color of the particles and slow down the speed of the particles, for example. EasingFunctions can be used with AlphaOverLifetime and DeaccelerationOverLifetime.

</details>

**Shapes:**

<details><summary>Circle</summary>

- `type: "circle"`
- `center: Position`
- `radius: number`

</details>

<details><summary>Rectangle</summary>

- `type: "rectangle"`
- `v1: Position`
- `v2: Position`

</details>

<details><summary>Triangle</summary>

- `type: "triangle"`
- `v1: Position`
- `v2: Position`
- `v3: Position`

</details>

Example definition of a shape:

```ts
const rectangle = {
  type: "rectangle",
  v1: { x: 100, y: 100 },
  v2: { x: 200, y: 200 },
};
```

## Development

See separate README for development instructions [here](https://github.com/Risto-Paasivirta/ParticleSystem/blob/master/README-dev.md).

## License:

MIT-license
