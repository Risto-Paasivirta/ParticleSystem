import { moduleToObject, objectToModule, moduleTypeRegistry } from "core/moduleTypeRegistry";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { Module } from "../module";

export class Gravity extends Module {
    strength = 0.2;

    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            particle.velocity.y += this.strength;
        });
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        // TODO: easing is not a serializable data type, this will not work out of the box !
        return moduleToObject(Gravity, ["strength"], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): Gravity {
        return objectToModule(Gravity, ["strength"], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "Gravity";
}
