# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2022-04-18

### Added

-   Added optional `repeat` property to all generators `bursts` properties.

    -   Can be used to make bursts repeat indefinitely.

### Fixed

-   Fixed package not working with Webpack v.5.x or CRA v.5.x due to package not being properly ES formatted.

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
