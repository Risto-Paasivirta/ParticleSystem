import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";

/**
 * Generator module that creates particles at random inside a circular area.
 */
export class CircleGenerator extends ParticleGenerator {
    /**
     * Center location of the circle.
     */
    center: Position = { x: 0, y: 0 };
    /**
     * Radius of the circle as pixels.
     */
    radius = 50;

    generateParticle(): void {
        const particle = new Particle();
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * this.radius;
        particle.position.x = this.center.x + Math.cos(angle) * radius;
        particle.position.y = this.center.y + Math.sin(angle) * radius;
        this.particleEffect.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: CircleGenerator.moduleTypeId,
            interval: this.interval,
            center: this.center,
            radius: this.radius,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): CircleGenerator {
        const module = new CircleGenerator(particleEffect);
        loadSerializedProperty(object, CircleGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, CircleGenerator, module, "center", deserializePrimitiveDataType);
        loadSerializedProperty(object, CircleGenerator, module, "radius", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "CircleGenerator";
}
