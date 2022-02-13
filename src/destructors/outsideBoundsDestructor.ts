import { ParticleSystem } from "particleSystem";
import { Shape } from "shapes/shape";
import { Module } from "../module";

/**
 * `Module` that destroys all particles whose center location is outside a generic _boundary_.
 *
 * Boundary must be specified when the module is created and can be modified during run-time with `boundary` property.
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
     * Particles outside this boundary are destroyed.
     *
     * Shapes can be selected via `Shapes` export.
     */
    boundary: Shape;

    constructor(parentSystem: ParticleSystem, boundary: Shape) {
        super(parentSystem);
        this.boundary = boundary;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (!this.boundary.containsPosition(particle.position)) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }
}
