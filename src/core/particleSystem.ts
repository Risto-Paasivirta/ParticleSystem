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
}
