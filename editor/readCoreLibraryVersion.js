// Node.JS script that parses compiled `modular-particle-system` package files and produces
// public/config.modularParticleSystem.json file.

const fs = require("fs");
const path = require("path");

const pathModularParticleSystem = path.resolve(
  "node_modules/modular-particle-system/"
);

const readModules = () => {
  const modulePaths = [
    path.resolve(pathModularParticleSystem, "generators/"),
    path.resolve(pathModularParticleSystem, "destructors/"),
    path.resolve(pathModularParticleSystem, "initializers/"),
    path.resolve(pathModularParticleSystem, "modifiers/"),
  ];
  const moduleNameBlacklist = ["generator.d.ts"];

  const moduleFiles = modulePaths
    .map((modulePath) =>
      fs.readdirSync(modulePath).map((file) => path.resolve(modulePath, file))
    )
    .flat()
    .filter((file) => file.endsWith("d.ts"))
    .filter(
      (file) =>
        undefined ===
        moduleNameBlacklist.find((blackListedName) =>
          file.endsWith(blackListedName)
        )
    );

  console.log(moduleFiles);

  const particleModules = moduleFiles.map((moduleFile) => {
    const moduleTypeDef = fs.readFileSync(moduleFile).toString();
    const moduleName = path.basename(moduleFile).replace(".d.ts", "");
    // NOTE: Assume moduleTypeId is equal to module name with big caps.
    const moduleTypeId = moduleName[0].toUpperCase() + moduleName.substring(1);
    const moduleData = {
      moduleTypeId,
      properties: {},
    };

    const regexpModulePropertiesBlocks = /@module((.|\s)*?)\*\//g;
    const regexpModuleInfoTags = /@(category)\s+(.*)/g;
    const regexpModulePropertyBlock = /([^ ]+)\s?{((.|\n|\r)*?)\*\s+}/g;
    const regexpModulePropertyFields = /@([^ ]*)\s+([^\n\r]*)/g;

    const matchModulePropertiesBlocks = Array.from(
      moduleTypeDef.matchAll(regexpModulePropertiesBlocks)
    );

    matchModulePropertiesBlocks.forEach((blockMatch) => {
      const block = blockMatch[1];

      // Match module info tags (for example: "@category Modifier")
      const matchModuleInfoTags = Array.from(
        block.matchAll(regexpModuleInfoTags)
      );
      matchModuleInfoTags.forEach((moduleInfoTagMatch) => {
        const infoTagName = moduleInfoTagMatch[1];
        const infoTagValue = moduleInfoTagMatch[2];
        moduleData[infoTagName] = infoTagValue;
      });

      // Match property blocks (for example: "easing { ... }")
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

const readEasingFunctions = () => {
  const easingFunctionsTypeDef = fs
    .readFileSync(path.resolve(pathModularParticleSystem, "easing.d.ts"))
    .toString();
  const regexpEasingFunctionNames =
    /@easingFunction(.|\n|\r)*?\s+(.*):\s?EasingFunction/g;
  const matchEasingFunctionNames = Array.from(
    easingFunctionsTypeDef.matchAll(regexpEasingFunctionNames)
  );
  const easingFunctionNames = matchEasingFunctionNames.map((match) => match[2]);
  return easingFunctionNames;
};

const readShapes = () => {
  const shapeSrcFilesPath = path.resolve(pathModularParticleSystem, "shapes/");
  const shapeSrcFilePaths = fs
    .readdirSync(shapeSrcFilesPath)
    .map((file) => path.resolve(shapeSrcFilesPath, file))
    .filter((path) => path.endsWith("d.ts"));

  const regexpShapeBlocks =
    /@shape[\n\r]+.*@defaultValue\s+({.*})(.|\n|\r)*?}/g;
  const regexpShapeBlockProperties = /([^\s]*)\s?:\s+([^\s]*);/g;
  const shapes = [];
  shapeSrcFilePaths.forEach((shapeSrcFilePath) => {
    const shapeSrc = fs.readFileSync(shapeSrcFilePath).toString();
    const shapeBlocks = Array.from(shapeSrc.matchAll(regexpShapeBlocks));
    shapeBlocks.forEach((shapeBlock) => {
      const shapeBlockSrc = shapeBlock[0];

      const propertiesMatch = Array.from(
        shapeBlockSrc.matchAll(regexpShapeBlockProperties)
      );
      const shapeData = {};
      propertiesMatch.forEach((property) => {
        const key = property[1];
        const value = property[2].replaceAll('"', "");
        shapeData[key] = value;
      });
      if (!("type" in shapeData)) {
        console.warn(`Detected shape tag but found no 'type' property`);
        return;
      }

      const shapeDefaultValue = shapeBlock[1];
      if (!shapeDefaultValue) {
        throw new Error(`Shape block has no @defaultValue: ${shapeData.type}`);
      }
      shapeData["defaultValue"] = shapeDefaultValue;

      shapes.push(shapeData);
    });
  });
  return shapes;
};

const particleModules = readModules();
const easingFunctions = readEasingFunctions();
const shapes = readShapes();
const config = {
  particleModules,
  easingFunctions,
  shapes,
};

fs.writeFileSync(
  "public/config.modularParticleSystem.json",
  JSON.stringify(config)
);

console.log(
  `Successfully created editor/public/config.modularParticleSystem.json !`
);
