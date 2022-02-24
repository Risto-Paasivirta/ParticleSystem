import { ModuleObject } from "core/particleSystem";
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
        throw new Error("Unimplemented method");
    }
}
