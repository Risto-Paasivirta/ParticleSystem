import { loadSerializedProperty } from "../serialization/moduleSerialization";
import { deserializeShape, serializeShape, Shape, shapeContainsPosition } from "../shapes/shape";
import { Module, ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";

/**
 * `Module` that destroys all particles whose center location is outside generic bounds.
 *
 * ```ts
 *  // Example usage
 *  const destructor = new OutsideBoundsDestructor(particleSystem);
 *  destructor.bounds = {
 *      type: "triangle",
 *      v1: { x: 100, y: 400 },
 *      v2: { x: 300, y: 400 },
 *      v3: { x: 200, y: 0 },
 *  };
 *  particleSystem.modules.push(destructor);
 * ```
 *
 * @moduleProperties
 * bounds {
 *      @tooltip        TODO
 *      @type           Shape
 * }
 */
export class OutsideBoundsDestructor extends Module {
    /**
     * Particles outside these bounds are destroyed.
     */
    bounds?: Shape;

    update(dt: number): void {
        const len = this.particleEffect.particles.length;
        if (!this.bounds) {
            return;
        }
        for (let i = 0; i < len; i += 1) {
            const particle = this.particleEffect.particles[i];
            if (!shapeContainsPosition(this.bounds, particle.position)) {
                this.particleEffect.destroyParticle(particle);
            }
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: OutsideBoundsDestructor.moduleTypeId,
            bounds: this.bounds && serializeShape(this.bounds),
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): OutsideBoundsDestructor {
        const module = new OutsideBoundsDestructor(particleEffect);
        loadSerializedProperty(object, OutsideBoundsDestructor, module, "bounds", deserializeShape);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "OutsideBoundsDestructor";
}
