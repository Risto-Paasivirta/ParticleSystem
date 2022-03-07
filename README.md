<!---
This README is displayed in the front page of GitHub page
--->

# Lightweight Particle System for TypeScript

The `modular-particle-system` package is an absolutely minimized particle system (**42 kB!**).

It is based around the idea of describing particle effects as combinations of different _modules_.

Each module adds a behavior to all particles of an effect.
For example, there is a module which randomizes the color of particles.
Or a module that assigns a random velocity to particles, and so on...
By combining these functionally simple modules, a wide variety of behaviors can be achieved.

This core package does NOT include any integration to a graphics framework.
It is designed to be completely free of any usage restrictions regarding a particular framework.

This repository does, however, include an [example integration with `PIXI.js`](https://github.com/Risto-Paasivirta/ParticleSystem/tree/master/playground/apps/helpers/renderer/renderer.ts)
It can be referenced to learn how the particle system can be integrated with a graphics framework.

## Repository structure

- `modular-particle-system`: The library itself
- `playground`: A separate application for manually testing the library with an example integration with `PIXI.js`

## Development

cd `playground`

1. Install all the dependencies.

   ```
   npm install
   ```

2. Run internal applications located in "./apps" folder.

   Open _CMD/Terminal_ to serve example applications and watch changes in the `./apps` and `module-particle-system/src` folder.

   ```
   npm start
   ```

## Usage and publication

The library can be installed via `NPM`:

```bash
npm i modular-particle-system
```

## License:

MIT-license

## 3rd Party Credits

Based on boilerplate template by [Yordan Kanchelov](https://github.com/yordan-kanchelov/pixi-typescript-boilerplate)
Beginner friendly template for pixi.js with [Webpack](https://webpack.js.org/)
