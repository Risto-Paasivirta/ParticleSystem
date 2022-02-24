import { Module } from "./module";
import { ModuleObject, ParticleSystem } from "./particleSystem";

/**
 * TODO
 */
interface ModuleTypeReference {
    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    moduleTypeId: string;

    fromObject(particleSystem: ParticleSystem, object: object): Module;
}

/**
 * TODO
 */
export const moduleTypeRegistry: ModuleTypeReference[] = [];

/**
 * TODO
 */
export const moduleToObject = <ModuleType extends ModuleTypeReference, ModuleInstanceType>(
    moduleType: ModuleType,
    savedProperties: Array<keyof ModuleInstanceType>,
    module: ModuleInstanceType,
): ModuleObject => {
    const obj: ModuleObject = {
        moduleTypeId: moduleType.moduleTypeId,
    };
    savedProperties.forEach((property) => {
        obj[property] = module[property];
    });
    return obj;
};

/**
 * TODO
 */
export const objectToModule = <
    ModuleType extends ModuleTypeReference & { new (particleSystem: ParticleSystem): ModuleInstanceType },
    ModuleInstanceType,
>(
    moduleType: ModuleType,
    loadedProperties: Array<keyof ModuleInstanceType>,
    object: ModuleObject,
    particleSystem: ParticleSystem,
): ModuleInstanceType => {
    const module = new moduleType(particleSystem);
    loadedProperties.forEach((property) => {
        const value = object[property];
        if (!value) {
            // This probably means that the module was saved with a different library version than the active one.
            console.warn(`${moduleType.moduleTypeId} property could not be loaded: "${property}"`);
            return;
        }
        module[property] = value as ModuleInstanceType[typeof property];
    });
    return module;
};
