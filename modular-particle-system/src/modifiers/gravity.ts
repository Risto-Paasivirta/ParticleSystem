import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { ParticleEffect } from "../particleEffect";
import { Position } from "../types";
import { clamp, lerp, vec2 } from "../utilities";

export class Gravity extends Module {
    strength = 100.0;

    /**
     * Center of gravity.
     *
     * If `undefined` (which is also the default value), the gravity behaves _naturally_, as
     * if pulling particles down at a constant speed.
     *
     * Can be set to a location to pull towards that location with varying strength
     * based on how close the particle is to the location (closer = stronger pull).
     * The pull behavior can be further configured with properties: `maxPullStrengthDistance`, `maxPullStrengthMultiplier`, `minPullStrengthDistance` and `minPullStrengthMultiplier`
     */
    center: Position | undefined;

    /**
     * **Does not affect anything when `center` is `undefined`**
     *
     * Particle distance from `center` that will correspond to gravity strength multiplier `maxPullStrengthMultiplier`
     */
    maxPullStrengthDistance = 100;
    /**
     * **Does not affect anything when `center` is `undefined`**
     *
     * `strength` multiplier that is used when particle is `maxPullStrengthDistance` away from `center`.
     */
    maxPullStrengthMultiplier = 1;
    /**
     * **Does not affect anything when `center` is `undefined`**
     *
     * Particle distance from `center` that will correspond to gravity strength multiplier `minPullStrengthMultiplier`
     */
    minPullStrengthDistance = 500;
    /**
     * **Does not affect anything when `center` is `undefined`**
     *
     * `strength` multiplier that is used when particle is `minPullStrengthDistance` away from `center`.
     */
    minPullStrengthMultiplier = 0.25;

    update(dt: number): void {
        const center = this.center;
        if (center) {
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
        } else {
            // "Natural gravity", pull particles down at a constant speed depending on configured strength.
            this.particleEffect.particles.forEach((particle) => {
                particle.velocity.y += this.strength * dt;
            });
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: Gravity.moduleTypeId,
            strength: this.strength,
            center: this.center,
            maxPullStrengthDistance: this.maxPullStrengthDistance,
            maxPullStrengthMultiplier: this.maxPullStrengthMultiplier,
            minPullStrengthDistance: this.minPullStrengthDistance,
            minPullStrengthMultiplier: this.minPullStrengthMultiplier,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): Gravity {
        const module = new Gravity(particleEffect);
        loadSerializedProperty(object, Gravity, module, "strength", deserializePrimitiveDataType);
        loadSerializedProperty(object, Gravity, module, "center", deserializePrimitiveDataType);
        loadSerializedProperty(object, Gravity, module, "maxPullStrengthDistance", deserializePrimitiveDataType);
        loadSerializedProperty(object, Gravity, module, "maxPullStrengthMultiplier", deserializePrimitiveDataType);
        loadSerializedProperty(object, Gravity, module, "minPullStrengthDistance", deserializePrimitiveDataType);
        loadSerializedProperty(object, Gravity, module, "minPullStrengthMultiplier", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "Gravity";
}
