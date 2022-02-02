import { Module } from "./Module";
import { Particle } from "./Particle";

export class ParticleSystem {
    modules: Module[] = [];
    particles: Particle[] = [];

    addParticleListeners: Module[] = [];
    destroyParticleListeners: Module[] = [];

    init(): void {
        this.modules.forEach((module) => {
            module.init();
        });
    }

    update(dt: number) {
        this.particles.forEach((particle) => {
            particle.timeLived += dt;
            particle.position.x += particle.velocity.x * dt;
            particle.position.y += particle.velocity.y * dt;
        });

        this.modules.forEach((module) => {
            if (module.active) {
                module.update(dt);
            }
        });
    }

    addParticle(particle: Particle) {
        this.particles.push(particle);
        this.addParticleListeners.forEach((module) => {
            module.onAddParticle(particle);
        });
    }

    destroyParticle(particle: Particle) {
        const index = this.particles.indexOf(particle, 0);
        if (index > -1) {
            this.particles.splice(index, 1);
            this.destroyParticleListeners.forEach((module) => {
                module.onDestroyParticle(particle);
            });
        }
    }
}
