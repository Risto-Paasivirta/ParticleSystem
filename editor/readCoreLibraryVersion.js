// Node.JS script that parses compiled `modular-particle-system` package files and produces
// public/config.modularParticleSystem.json file.

const fs = require("fs");
const path = require("path");

const pathModularParticleSystem = path.resolve(
  //   "node_modules/modular-particle-system/"
  "../modular-particle-system/dist/"
);

const readModules = () => {
  const modulePaths = [
    path.resolve(pathModularParticleSystem, "generators/"),
    path.resolve(pathModularParticleSystem, "destructors/"),
    path.resolve(pathModularParticleSystem, "initializers/"),
    path.resolve(pathModularParticleSystem, "modifiers/"),
  ];

  const moduleFiles = modulePaths
    .map((modulePath) =>
      fs.readdirSync(modulePath).map((file) => path.resolve(modulePath, file))
    )
    .flat()
    .filter((file) => file.endsWith("d.ts"));

  const particleModules = moduleFiles.map((moduleFile) => {
    const moduleTypeDef = fs.readFileSync(moduleFile).toString();
    const moduleName = path.basename(moduleFile).replace(".d.ts", "");
    // NOTE: Assume moduleTypeId is equal to module name with big caps.
    const moduleTypeId = moduleName[0].toUpperCase() + moduleName.substring(1);
    const moduleData = {
      moduleTypeId,
      properties: {},
    };

    const regexpModulePropertiesBlocks = /@moduleProperties((.|\s)*?)\*\//g;
    const regexpModulePropertyBlock = /([^ ]+)\s?{((.|\n|\r)*?)}/g;
    const regexpModulePropertyFields = /@([^ ]*)\s+([^\n\r]*)/g;

    const matchModulePropertiesBlocks = Array.from(
      moduleTypeDef.matchAll(regexpModulePropertiesBlocks)
    );

    matchModulePropertiesBlocks.forEach((blockMatch) => {
      const block = blockMatch[1];
      const matchModulePropertyBlock = Array.from(
        block.matchAll(regexpModulePropertyBlock)
      );

      matchModulePropertyBlock.forEach((propertyBlockMatch) => {
        const propertyName = propertyBlockMatch[1];
        const propertyBlock = propertyBlockMatch[2];
        const moduleProperty = {};

        const matchFields = Array.from(
          propertyBlock.matchAll(regexpModulePropertyFields)
        );

        matchFields.forEach((field) => {
          const fieldName = field[1];
          const fieldValue = field[2];
          moduleProperty[fieldName] = fieldValue;
        });

        moduleData.properties[propertyName] = moduleProperty;
      });
    });

    return moduleData;
  });

  return particleModules;
};

const particleModules = readModules();
const config = {
  particleModules,
};

fs.writeFileSync(
  "public/config.modularParticleSystem.json",
  JSON.stringify(config)
);
