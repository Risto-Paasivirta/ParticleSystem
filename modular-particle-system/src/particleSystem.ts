import { ParticleEffect, ParticleEffectObject } from "./particleEffect";

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

    static fromObject(object: ParticleSystemObject, options?: { hideWarnings?: boolean }): ParticleSystem {
        const particleSystem = new ParticleSystem();
        const effectObjects = object.effects;
        effectObjects.forEach((effectObject) => {
            ParticleEffect.fromObject(particleSystem, effectObject, options);
        });
        return particleSystem;
    }
}

interface ParticleSystemObject {
    effects: Array<ParticleEffectObject>;
}
