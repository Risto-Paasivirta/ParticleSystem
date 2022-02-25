import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { moduleTypeRegistry, moduleToObject, objectToModule } from "core/moduleTypeRegistry";

export class PointGenerator extends ParticleGenerator {
    position: Position = { x: 0, y: 0 };

    generateParticle() {
        const particle = new Particle();
        particle.position.x = this.position.x;
        particle.position.y = this.position.y;

        this.parentSystem.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return moduleToObject(PointGenerator, ["interval", "position"], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): PointGenerator {
        return objectToModule(PointGenerator, ["interval", "position"], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "PointGenerator";
}
