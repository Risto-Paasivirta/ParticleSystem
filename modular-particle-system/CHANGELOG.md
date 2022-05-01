# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

-   Fixed `ShapeGenerator` with `Triangle` shape and `edgesOnly: true` crashing.

## [1.3.0] - 2022-04-30

### Added

-   Added `ParticleEffect.fromObject`

### Fixed

-   Fixed `ShapeGenerator` not deserializing `bursts` property.

## [1.2.0] - 2022-04-24

### Added

-   Added `GravityWithCenter` modifier.
-   Added `RandomColor.interpolate` property.
-   Added `Circle` shape.
-   Added `RandomRotation` initializer module.

### Removed

-   Removed `center` and related properties from `Gravity` modifier.
    -   These were separated to their own module `GravityWithCenter`.
-   `CircleGenerator` and `CircleExteriorGenerator`, use `ShapeGenerator` instead.

### Fixed

-   `AlphaOverLifetime` not working together with `AlphaRange`

## [1.1.0] - 2022-04-18

### Added

-   Added optional `repeat` property to all generators `bursts` properties.

    -   Can be used to make bursts repeat indefinitely.

### Fixed

-   Fixed package not working with Webpack v.5.x or CRA v.5.x due to package not being properly ES formatted.
-   Fixed `RandomColor` crashing if `palette.length` was 1 or less.

## [1.0.0] - 2022-04-10

### Added

-   `ShapeGenerator.edgesOnly`

### Changed

-   Package is now published as ES6 module instead of ES2020

### Removed

## [0.2.4] - 2022-04-04

### Added

-   Added optional `options` parameter to `ParticleSystem.fromObject`
    -   This can be used to disable warnings triggered by `fromObject` method. In many cases, these warnings can be safely ignored.

### Changed

### Removed
