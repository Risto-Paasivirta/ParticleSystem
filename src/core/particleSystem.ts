import { ParticleEffect } from "./particleEffect";

export class ParticleSystem {
    effects: ParticleEffect[] = [];
    addParticleEffectListeners: ((effect: ParticleEffect) => unknown)[] = [];

    init(): void {
        this.effects.forEach((effect) => {
            effect.init();
        });
    }

    update(dt: number) {
        this.effects.forEach((effect) => effect.update(dt));
    }

    addParticleEffect(): ParticleEffect {
        const particleEffect = new ParticleEffect(this);
        this.effects.push(particleEffect);
        this.addParticleEffectListeners.forEach((clbk) => clbk(particleEffect));
        return particleEffect;
    }
}
