import { Module } from "../module";
/**
 * 'Module' that destroys all particles whose
 *
 *
 */
export class AlphaDestructor extends Module {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (particle.color.a <= 0) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }
}
