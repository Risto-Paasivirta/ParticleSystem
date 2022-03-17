/* eslint-disable @typescript-eslint/no-empty-function */
import { ParticleEffect } from "./particleEffect";

export abstract class Module {
    /**
     * Modules with `active === true` will have frequent calls to `update()` method.
     */
    active = true;
    particleEffect: ParticleEffect;

    constructor(particleEffect: ParticleEffect) {
        this.particleEffect = particleEffect;
    }

    init(): void {}
    update(dt: number): void {}

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    abstract toObject(): ModuleObject;
}

export interface ModuleObject {
    moduleTypeId: string | undefined;
    [key: string | number | symbol]: unknown;
}
