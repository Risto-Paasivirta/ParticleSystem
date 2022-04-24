import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { ParticleEffect } from "../particleEffect";
import { Position } from "../types";
import { clamp, lerp, vec2 } from "../utilities";

/**
 * @module
 * @category    Modifier
 * strength {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           10
 *      @defaultValue   100
 * }
 * center {
 *      @tooltip        TODO
 *      @type           Position
 *      @defaultValue   { "x": 0, "y": 0 }
 * }
 * minPullStrengthMultiplier {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           0.1
 *      @defaultValue   0.2
 * }
 * maxPullStrengthMultiplier {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           0.1
 *      @defaultValue   1.0
 * }
 * minPullStrengthDistance {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           50
 *      @defaultValue   500
 * }
 * maxPullStrengthDistance {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           50
 *      @defaultValue   100
 * }
 */
export class GravityWithCenter extends Module {
    strength = 100.0;

    /**
     * Center of gravity. Pulls particles towards that location with varying strength
     * based on how close the particle is to the location (closer = stronger pull).
     * The pull strength can be further configured with properties: `maxPullStrengthDistance`, `maxPullStrengthMultiplier`, `minPullStrengthDistance` and `minPullStrengthMultiplier`
     */
    center: Position = { x: 0, y: 0 };

    /**
     * Particle distance from `center` that will correspond to gravity strength multiplier `maxPullStrengthMultiplier`
     */
    maxPullStrengthDistance = 100;
    /**
     * `strength` multiplier that is used when particle is `maxPullStrengthDistance` away from `center`.
     */
    maxPullStrengthMultiplier = 1;
    /**
     * Particle distance from `center` that will correspond to gravity strength multiplier `minPullStrengthMultiplier`
     */
    minPullStrengthDistance = 500;
    /**
     * `strength` multiplier that is used when particle is `minPullStrengthDistance` away from `center`.
     */
    minPullStrengthMultiplier = 0.25;

    update(dt: number): void {
        const center = this.center;
        // Pull particles towards the gravity center, with varying strength based on how close the particles are to the location (closer = stronger pull)
        this.particleEffect.particles.forEach((particle) => {
            const toCenter = vec2.subtract(center, particle.position);
            const particleDistance = vec2.length(toCenter);
            const pullStrengthMultiplier = lerp(
                this.minPullStrengthMultiplier,
                this.maxPullStrengthMultiplier,
                clamp(
                    (particleDistance - this.minPullStrengthDistance) /
                        (this.maxPullStrengthDistance - this.minPullStrengthDistance),
                    0,
                    1,
                ),
            );
            const pullStrength = dt * this.strength * pullStrengthMultiplier;
            const pullDirection = vec2.normalize(toCenter);
            particle.velocity.x += pullDirection.x * pullStrength;
            particle.velocity.y += pullDirection.y * pullStrength;
        });
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: GravityWithCenter.moduleTypeId,
            strength: this.strength,
            center: this.center,
            maxPullStrengthDistance: this.maxPullStrengthDistance,
            maxPullStrengthMultiplier: this.maxPullStrengthMultiplier,
            minPullStrengthDistance: this.minPullStrengthDistance,
            minPullStrengthMultiplier: this.minPullStrengthMultiplier,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): GravityWithCenter {
        const module = new GravityWithCenter(particleEffect);
        loadSerializedProperty(
            object,
            GravityWithCenter,
            module,
            "strength",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(object, GravityWithCenter, module, "center", deserializePrimitiveDataType, hideWarnings);
        loadSerializedProperty(
            object,
            GravityWithCenter,
            module,
            "maxPullStrengthDistance",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            GravityWithCenter,
            module,
            "maxPullStrengthMultiplier",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            GravityWithCenter,
            module,
            "minPullStrengthDistance",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            GravityWithCenter,
            module,
            "minPullStrengthMultiplier",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "GravityWithCenter";
}
