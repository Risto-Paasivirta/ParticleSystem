import { Module } from "../module";
/**
 * `Module` that destroys all particles whose color alpha value is less or equal to 0
 */
export class AlphaDestructor extends Module {
    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (particle.alpha <= 0) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }
}
