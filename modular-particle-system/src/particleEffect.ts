import { Module, ModuleObject } from "./module";
import { Particle } from "./particle";
import { ParticleSystem } from "./particleSystem";
import { moduleTypeRegistry } from "./serialization/moduleRegistry";

export class ParticleEffect {
    particleSystem: ParticleSystem;
    modules: Module[] = [];
    particles: Particle[] = [];
    isInitialized = false;

    /**
     * List of texture names that are randomly assigned to particles of this effect.
     */
    textures: string[] = [];

    addParticleListeners: ((particle: Particle) => unknown)[] = [];
    destroyParticleListeners: ((particle: Particle) => unknown)[] = [];

    /**
     * **NOTE: ParticleEffects should be created with `ParticleSystem.addParticleEffect()` instead of using the constructor directly**
     */
    constructor(particleSystem: ParticleSystem) {
        this.particleSystem = particleSystem;
    }

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
            particle.rotation += particle.rotationalVelocity * dt;
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

        if (this.textures.length > 0) {
            // Assign particle texture.
            particle.texture = this.textures[Math.round(Math.random() * (this.textures.length - 1))];
        }

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

    static fromObject(
        particleSystem: ParticleSystem,
        effectObject: ParticleEffectObject,
        options?: { hideWarnings?: boolean },
    ): ParticleEffect {
        const hideWarnings = options?.hideWarnings || false;
        const effect = particleSystem.addParticleEffect();
        effect.textures = effectObject.textures;
        effectObject.modules?.forEach((moduleObject) => {
            const moduleTypeReference = moduleTypeRegistry.find(
                (moduleType) => moduleType.moduleTypeId === moduleObject.moduleTypeId,
            );
            if (!moduleTypeReference) {
                // The module type can't be identified. This probably means that it was saved with a different library version than the active one.
                if (!hideWarnings) console.warn(`fromObject unidentified module type: "${moduleObject.moduleTypeId}"`);
                return;
            }

            const module = moduleTypeReference.fromObject(effect, moduleObject, hideWarnings);
            effect.modules.push(module);
        });
        return effect;
    }
}

export type ParticleEffectObject = { modules: ModuleObject[] | undefined; textures: string[] };
