# Lightweight Particle System for TypeScript with example PIXI.js integration

We could really use a catchy name ^^

## Repository structure

- `modular-particle-system`: The library itself
- `playground`: A separate application for manually testing the library with an example integration with `PIXI.js`
- `example`: Example of importing the library via `NPM`

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

The library is intended to be used via `NPM` with a custom integration to `PIXI.js` or any other UI/graphics framework.

Install with:

```bash
npm i modular-particle-system-test
```

The library `NPM` version can be updated by editing the version number in `modular-particle-system/package.json` and using command `npm run release`

## License:

MIT-license

## 3rd Party Credits

Based on boilerplate template by [Yordan Kanchelov](https://github.com/yordan-kanchelov/pixi-typescript-boilerplate)
Beginner friendly template for pixi.js with [Webpack](https://webpack.js.org/)
