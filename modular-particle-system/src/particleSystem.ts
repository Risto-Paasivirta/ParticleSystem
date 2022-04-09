import { ModuleObject } from "./module";
import { moduleTypeRegistry } from "./serialization/moduleRegistry";
import { ParticleEffect } from "./particleEffect";

export class ParticleSystem {
    effects: ParticleEffect[] = [];
    addParticleEffectListeners: ((effect: ParticleEffect) => unknown)[] = [];
    removeParticleEffectListeners: ((effect: ParticleEffect) => unknown)[] = [];

    update(dt: number) {
        this.effects.forEach((effect) => {
            if (!effect.isInitialized) {
                effect.init();
                effect.isInitialized = true;
            }
            effect.update(dt);
        });
    }

    addParticleEffect(): ParticleEffect {
        const particleEffect = new ParticleEffect(this);
        this.effects.push(particleEffect);
        this.addParticleEffectListeners.forEach((clbk) => clbk(particleEffect));
        return particleEffect;
    }

    removeParticleEffect(particleEffect: ParticleEffect) {
        const i = this.effects.indexOf(particleEffect);
        if (i <= 0) {
            this.effects.splice(i, 1);
            this.removeParticleEffectListeners.forEach((clbk) => clbk(particleEffect));
        }
    }

    /**
     * Wrap the properties of the whole particle system into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ParticleSystemObject {
        return {
            effects: this.effects.map((effect) => ({
                textures: effect.textures,
                modules: effect.modules.map((module) => module.toObject()),
            })),
        };
    }

    static fromObject(object: ParticleSystemObject): ParticleSystem {
        const particleSystem = new ParticleSystem();
        const effectObjects = object.effects;
        effectObjects.forEach((effectObject) => {
            const effect = particleSystem.addParticleEffect();
            effect.textures = effectObject.textures;
            effectObject.modules?.forEach((moduleObject) => {
                const moduleTypeReference = moduleTypeRegistry.find(
                    (moduleType) => moduleType.moduleTypeId === moduleObject.moduleTypeId,
                );
                if (!moduleTypeReference) {
                    // The module type can't be identified. This probably means that the particle system was saved with a different library version than the active one.
                    console.warn(`ParticleSystem.fromObject unidentified module type: "${moduleObject.moduleTypeId}"`);
                    return;
                }

                const module = moduleTypeReference.fromObject(effect, moduleObject);
                effect.modules.push(module);
            });
        });
        return particleSystem;
    }
}

interface ParticleSystemObject {
    effects: Array<{ modules: ModuleObject[] | undefined; textures: string[] }>;
}
