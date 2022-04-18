<!---
This README is targeted for developers of the modular particle system package, and more specifically to SeepiaGames

It can be opened from a link on the bottom of GitHub README
--->

## Repository structure

- `modular-particle-system`: The library itself
- `playground`: A separate application for manually testing and developing the library with an example graphics integration with `PIXI.js`
- `editor`: A separate application for presenting and experimenting with the library. Hosted with [GitHub Pages](https://risto-paasivirta.github.io/ParticleSystem/).
- `examples`: Folder that contains use case examples of using the particle library with different frameworks. At this time, these do not give any value other than confirming that the NPM package works.

## Developing `modular-particle-system`

The TypeScript source code of the modular particle system library is found in `modular-particle-system/src`.

Developing changes to the library is intended to be done using the [separate `playground` application](#developing-with-playground).

Here are explanations of some library areas which might not be obvious:

<details><summary>Serialization and de-serialization</summary>

The modular particle system has built-in support for serialization to JSON and back. This is made possible due to each _module_ implementing methods `toObject` and `fromObject`. For these methods to work properly, each module has to make sure that all their serializable properties are individually handled in both methods. Please refer to existing implementations on how it is actually done.

There are some property types which might not be inherently serializable, such as _shapes_ and _easing functions_. Each module is responsible for pairing these properties with capable serialization and de-serialization functions (e.g. `serializeEasing` and `deserializeEasing`).

Finally, for module de-serialization to work, each unique _module_ must be listed in _the module registry_ (`src/serialization/moduleRegistry.ts`).

</details>

<details><summary>Connection to Editor</summary>

The separate `editor` application is very closely tied together with the particle effect library as it is a visual non-programmer interface to all features of the particle library. To avoid heavy maintaining the UI fields of the _editor_ are read from a custom documentation syntax present in the core library source code. Below is an example how these look:

```ts
/**
 * @module
 * @category    Modifier
 * easing {
 *      @tooltip        TODO
 *      @type           EasingFunction
 *      @defaultValue   easeOutSine
 * }
 */
export class AlphaOverLifetime extends Module {
```

Once more, this documentation is completely custom formatted and is read using _Regular Expressions_. The code responsible for this is a _Node_ script at `editor/readCoreLibraryVersion.js`.

</details>

<details><summary>Package build and publishing releases</summary>

The modular-particle-system release files can be built with below command:

```console
ParticleSystem/modular-particle-system/
$   npm run release:build
```

This will result in `modular-particle-system/release` folder being created. This folder is the one that is uploaded to NPM as well as the one that is downloaded to `node_modules/modular-particle-system` when the library is installed.

Actually publishing the library to NPM requires you to login to NPM with `npm login` and then running `npm run release`. This probably requires collaborator access from the original publisher of the library (Niilo Keinänen).

</details>

<details><summary>Minification testing</summary>

The release version of modular particle system is NOT minified.
However, whenever the source code is compiled from TypeScript to JavaScript there is an automatic step which runs the code through a commonly used JS minimizer `uglify-js` and prints the minimized code size to the console.

This can be tested with `npm run compile`, which should print something like this:

```console
ParticleSystem/modular-particle-system/
$   npm run compile
>   Tested UglifyJS (compress + mangle): 26.8 kB (down from 70.3 kB)
```

The _Node_ script responsible for this testing is `modular-particle-system/test-minify.js`

</details>

## Developing with `playground`

The _playground_ is a separate Webpack application based on boilerplate template by [Yordan Kanchelov](https://github.com/yordan-kanchelov/pixi-typescript-boilerplate)
Beginner friendly template for pixi.js with [Webpack](https://webpack.js.org/).

It is started with following commands:

```console
ParticleSystem/playground/
$   npm i
$   npm start
```

This should automatically open the application in a native web browser. It presents a list of all the testing applications from `playground/apps` which can be separately opened.

The `modular-particle-system` source code is included in the same compilation process as the `playground`, so any modifications to the core library code will immediately be reloaded to the playground application.

The graphics integration is implemented with `PIXI.js` and can be found in `playground/apps/helpers/renderer.ts`.

The playground application doesn't have any other purpose other than manual testing and development of the particle library.

## Documentation of `editor` application

The _editor_ is a separate _React_ application that provides a non-programmer interface to the particle library. It can be used to test, experiment as well as configure and export particle effects in a web browser. The master branch version can be accessed [here](https://risto-paasivirta.github.io/ParticleSystem/). This deployment is automatically updated when changes are pushed to the `master` branch.

In development, it can be run with `npm start`, which opens it automatically in a web browser.

```console
ParticleSystem/editor/
$   npm start
```

### Configs

#### Particle library version

The available modules, shapes, easing functions and other things that originate from the modular particle system are read from a configuration file: `editor/public/config.modularParticleSystem.json`. This file is **automatically generated** (see [Developing modular-particle-system : Connection to Editor](#developing-modular-particle-system)).

The config file can be regenerated based on the local source code version of `modular-particle-system` simply by installing editor dependencies:

```console
ParticleSystem/editor/
$   npm i
```

#### Available particle textures

All particle textures that can be used inside the editor are placed as sprite sheets in `editor/public/sprites`. Additionally each sprite sheet name has to be added to `editor/public/config.spritesheets.json`.

#### Preset particle effects

The editor has a button at the top tool bar: "Load preset" which allows loading complete particle system configurations. This is great for demonstration purposes.

These preset configurations are defined in `editor/public/config.presetParticleEffects.json`. Modifications are easy to do by hand, simply pasting the exact output from editor "Save to file" button and adding some metadata for the `label` and `thumbnail` properties.

The thumbnail images are placed in `public/presetThumbnails/` folder.

### Development notes

<details><summary>Module default values</summary>

The editor app stores the states of active particle effects in JavaScript objects. These are de-serialized to modular particle system library, which works great. Something to keep in mind though is loading of module property default values.

When a _module_ is de-serialized, any non-specified properties are initialized to their default values. This logic exists on the side of `modular-particle-system`. Currently, Editor has logic that ensures that ALL module properties are assigned default values already before de-serialization. This is separate from the previously mentioned default values (done in `Editor.js loadParticleEffectDefaults` function).

The current state of things originates from ensuring that the UI always matches the actual module property values loaded by `modular-particle-system`. This, however, requires documenting all module properties with `@defaultValue`s and handling the de-serialization of these in previously mentioned `loadParticleEffectDefaults` function.

A better approach would be to lean on the default value initialization of `modular-particle-system` which would require reading back the actually loaded module property values from the de-serialized particle effects. This might be quite difficult to implement but would be a great improvement to the simplicity and maintainability of `editor` app.

</details>

<details><summary>Module property types</summary>

Each different property type that can be used by _modules_ has to be specifically implemented in the _editor_ app.

At time of writing these _property types_ include following:

- `NumberProperty`
- `BooleanProperty`
- `ShapeProperty`
- `ColorPaletteProperty`
- `EasingFunctionProperty`
- `PositionProperty`

These components are found in `editor/src/components/EffectsConfigurationPanel/ModuleProperty/` folder.

They are connected through the `@type` documentation tag present in modular particle system source code (see example below).

```ts
/**
 * min {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @max            1
 *      @step           0.1
 *      @defaultValue   0
 * }
 */
export class AlphaRange extends Module {
```

When adding a new property type, the `ModuleProperty.js` file must be edited to connect the `@type` value to the corresponding React component.

</details>
