import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";

/**
 * Generator module that creates particles along the exterior of a circular area.
 */
export class CircleEdgeGenerator extends ParticleGenerator {
    /**
     * Center position of the circle.
     */
    center: Position = { x: 0, y: 0 };
    /**
     * Max Radius of the circle as pixels.
     */
    outerRadius = 50;
    /**
     * /**
     * Min Radius of the circle as pixels.
     */
    innerRadius = 40;

    generateParticle(): void {
        const particle = new Particle();
        const nextParticleAngle = Math.random() * Math.PI * 2;
        /**
         * Sphere is the distance between two radius as pixels
         */
        const sphere = Math.random() * (this.outerRadius - this.innerRadius) + this.innerRadius;

        particle.position.x = this.center.x + Math.cos(nextParticleAngle) * sphere;
        particle.position.y = this.center.y + Math.sin(nextParticleAngle) * sphere;
        this.particleEffect.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: CircleEdgeGenerator.moduleTypeId,
            interval: this.interval,
            center: this.center,
            outerRadius: this.outerRadius,
            innerRadius: this.innerRadius,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): CircleEdgeGenerator {
        const module = new CircleEdgeGenerator(particleEffect);
        loadSerializedProperty(object, CircleEdgeGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, CircleEdgeGenerator, module, "center", deserializePrimitiveDataType);
        loadSerializedProperty(object, CircleEdgeGenerator, module, "outerRadius", deserializePrimitiveDataType);
        loadSerializedProperty(object, CircleEdgeGenerator, module, "innerRadius", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "CircleEdgeGenerator";
}
