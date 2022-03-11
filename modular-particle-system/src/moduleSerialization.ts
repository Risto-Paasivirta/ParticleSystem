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
import { ParticleEffect } from "./particleEffect";

/**
 * This list should contain all Modules in the library.
 *
 * It is required for deserializing Modules from JS objects.
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

interface ModuleTypeReference {
    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    moduleTypeId: string;

    fromObject(particleEffect: ParticleEffect, object: object): Module;
}

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

/**
 * Function for satisfying types when deserializing a primitive data type.
 *
 * Examples of primitive data types:
 * - `property = 1.0`
 * - `property = 'hello'`
 * - `property = { x: 1.0, something: 'text' }`
 * - `property = [ 0.0, 1.0 ]`
 *
 * @param serializedPrimitiveDataType
 * @returns
 */
export const deserializePrimitiveDataType = <T>(serializedPrimitiveDataType: unknown): T => {
    return serializedPrimitiveDataType as T;
};
