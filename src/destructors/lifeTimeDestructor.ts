import { Module } from "../module";

export class LifeTimeDestructor extends Module {
    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (particle.timeLived >= particle.lifeTime) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }
}
