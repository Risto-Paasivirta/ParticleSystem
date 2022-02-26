import { AlphaDestructor } from "./destructors/alphaDestructor";
import { LifeTimeDestructor } from "./destructors/lifeTimeDestructor";
import { OutsideBoundsDestructor } from "./destructors/outsideBoundsDestructor";
import { CircleExteriorGenerator } from "./generators/circleExteriorGenerator";
import { PointGenerator } from "./generators/pointGenerator";
import { AlphaRange } from "./initializers/alphaRange";
import { LifeTimeRange } from "./initializers/lifeTimeRange";
import { RandomAngleVelocity } from "./initializers/randomAngleVelocity";
import { RandomVelocity } from "./initializers/randomVelocity";
import { AlphaOverLifetime } from "./modifiers/alphaOverLifetime";
import { DeaccelerationOverLifetime } from "./modifiers/deaccelerationOverLifetime";
import { Gravity } from "./modifiers/gravity";
import { Module } from "./module";
import { ModuleObject, ParticleSystem } from "./particleSystem";

// TODO: Rename to serialization

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
export const moduleTypeRegistry: ModuleTypeReference[] = [
    AlphaDestructor,
    LifeTimeDestructor,
    OutsideBoundsDestructor,
    CircleExteriorGenerator,
    PointGenerator,
    AlphaRange,
    LifeTimeRange,
    RandomAngleVelocity,
    RandomVelocity,
    AlphaOverLifetime,
    DeaccelerationOverLifetime,
    Gravity,
];

export const loadSerializedProperty = <
    ModuleType extends ModuleTypeReference,
    ModuleInstanceType,
    PropertyKey extends keyof ModuleInstanceType,
>(
    object: object,
    moduleType: ModuleType,
    module: ModuleInstanceType,
    key: PropertyKey,
    deserializeValue: (value: unknown) => ModuleInstanceType[typeof key] | undefined,
): void => {
    const value = object[key as keyof object];
    if (!value) {
        console.warn(`Missing module property ${moduleType.moduleTypeId}: "${key}"`);
        return;
    }

    const deserializedValue = deserializeValue(value);
    if (deserializedValue === undefined) {
        console.warn(`Module property could not be deserialized ${moduleType.moduleTypeId}: "${key}"`);
        return;
    }

    module[key] = deserializedValue;
};

export const deserializePrimitiveDataType = <T>(serializedPrimitiveDataType: unknown): T => {
    return serializedPrimitiveDataType as T;
};
