import { Module } from "../module";

export class LifeTimeDestructor extends Module {
    update(dt: number): void {
        const len = this.particleEffect.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.particleEffect.particles[i];
            if (particle.timeLived >= particle.lifeTime) {
                this.particleEffect.destroyParticle(particle);
            }
        }
    }
}
