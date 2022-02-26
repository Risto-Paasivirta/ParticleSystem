import { Module } from "./module";
import { moduleTypeRegistry } from "./moduleSerialization";
import { Particle } from "./particle";

export class ParticleSystem {
    modules: Module[] = [];
    particles: Particle[] = [];

    addParticleListeners: ((particle: Particle) => unknown)[] = [];
    destroyParticleListeners: ((particle: Particle) => unknown)[] = [];

    init(): void {
        this.modules.forEach((module) => {
            module.init();
        });
    }

    update(dt: number) {
        const len = this.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.particles[i];
            particle.timeLived += dt;
            particle.position.x += particle.velocity.x * dt;
            particle.position.y += particle.velocity.y * dt;
        }

        this.modules.forEach((module) => {
            if (module.active) {
                module.update(dt);
            }
        });

        // Remove destroyed particles
        for (let i = 0; i < this.particles.length; i += 1) {
            const particle = this.particles[i];
            if (particle.destroyed) {
                this.particles.splice(i, 1);
                i -= 1;
            }
        }
    }

    addParticle(particle: Particle) {
        this.particles.push(particle);
        this.addParticleListeners.forEach((clbk) => {
            clbk(particle);
        });
    }

    /**
     * Destroy a particle, removing it from further updates.
     *
     * This can be safely called while iterating over `particles`, the array is not modified immediately.
     */
    destroyParticle(particle: Particle) {
        // Modifying particle arrays can be heavy, better mark particles that should be removed and modify array just once during update.
        particle.destroyed = true;
        this.destroyParticleListeners.forEach((clbk) => {
            clbk(particle);
        });
    }

    /**
     * Wrap the properties of the whole particle system into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ParticleSystemObject {
        return {
            modules: this.modules.map((module) => module.toObject()),
        };
    }

    static fromObject(object: ParticleSystemObject): ParticleSystem {
        const particleSystem = new ParticleSystem();
        const moduleObjects = object.modules;
        moduleObjects?.forEach((moduleObject) => {
            const moduleTypeReference = moduleTypeRegistry.find(
                (moduleType) => moduleType.moduleTypeId === moduleObject.moduleTypeId,
            );
            if (!moduleTypeReference) {
                // The module type can't be identified. This probably means that the particle system was saved with a different library version than the active one.
                console.warn(`ParticleSystem.fromObject unidentified module type: "${moduleObject.moduleTypeId}"`);
                return;
            }

            const module = moduleTypeReference.fromObject(particleSystem, moduleObject);
            particleSystem.modules.push(module);
        });
        return particleSystem;
    }
}

interface ParticleSystemObject {
    modules: ModuleObject[] | undefined;
}

export interface ModuleObject {
    moduleTypeId: string | undefined;
    [key: string | number | symbol]: unknown;
}
