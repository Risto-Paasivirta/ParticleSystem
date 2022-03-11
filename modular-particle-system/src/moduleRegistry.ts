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

export interface ModuleTypeReference {
    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    moduleTypeId: string;

    fromObject(particleEffect: ParticleEffect, object: object): Module;
}
