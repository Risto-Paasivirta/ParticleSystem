Prototype of a single page web application that provides a simple user interface for creating and configuring modular particle effects and seeing the results live.

Additionally features:

- Loading effects from presets
- Saving created effects to file
- Loading effects from file

# Notes

- Module data structures are described in `public/config.particleModules.json`
  - This file is automatically configured when `npm i` is run in `editor` project.
  - The generation logic is defined in `readParticleModulesConfig.js`
  - The content originates from `modular-particle-system` source code using custom `@module` documentation format.
