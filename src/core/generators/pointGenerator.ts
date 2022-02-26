import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { deserializePrimitiveDataType, loadSerializedProperty } from "core/moduleSerialization";

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
        return {
            moduleTypeId: PointGenerator.moduleTypeId,
            interval: this.interval,
            position: this.position,
        };
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): PointGenerator {
        const module = new PointGenerator(particleSystem);
        loadSerializedProperty(object, PointGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, PointGenerator, module, "position", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "PointGenerator";
}
