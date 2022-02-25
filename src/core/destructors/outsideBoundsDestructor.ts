import { moduleToObject, objectToModule, moduleTypeRegistry } from "core/moduleTypeRegistry";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { Shape } from "core/shapes/shape";
import { Module } from "../module";

/**
 * `Module` that destroys all particles whose center location is outside generic bounds.
 *
 * Bounds must be specified when the module is created and can be modified during run-time with `bounds` property.
 *
 * ```ts
 *  // Example usage
 *  const destructor = new OutsideBoundsDestructor(
 *      particleSystem,
 *      Shapes.Triangle({ x: 100, y: 400 }, { x: 300, y: 400 }, { x: 200, y: 0 }),
 *  );
 * ```
 */
export class OutsideBoundsDestructor extends Module {
    /**
     * Particles outside these bounds are destroyed.
     *
     * Shapes can be selected via `Shapes` export.
     */
    bounds?: Shape;

    constructor(parentSystem: ParticleSystem) {
        super(parentSystem);
    }

    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        if (!this.bounds) {
            return;
        }
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (!this.bounds.containsPosition(particle.position)) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        // TODO: 'bounds' are not a primitive data type, this will not work out of the box !
        return moduleToObject(OutsideBoundsDestructor, ["bounds"], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): OutsideBoundsDestructor {
        return objectToModule(OutsideBoundsDestructor, ["bounds"], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "OutsideBoundsDestructor";
}
