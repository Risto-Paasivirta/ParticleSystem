Prototype of a single page web application that provides a simple user interface for creating and configuring modular particle effects and seeing the results live.

Additionally features:

- Loading effects from presets
- Saving created effects to file
- Loading effects from file

# Notes

- All available Modules and property fields in the editor originate from custom documentation in the core library `modular-particle-system`.
  - The custom documentation is indicated by custom tags such as:
    - `@module`
    - `@easingFunction`
  - This documentation is automatically parsed into a configuration file (`public/config.modularParticleSystem.json`), whenever `npm i` is run in `editor` project.
    - The generation logic is defined in `readCoreLibraryVersion.js` script.
