import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { loadSerializedProperty, deserializePrimitiveDataType } from "core/moduleTypeRegistry";

// NOTE: Ideally we would have a class for `CircleGenerator`, where user could configure whether to generate particles inside the circle or along the exterior.
// `generator.onlyExterior = true` or something like this.

/**
 * Generator module that creates particles along the exterior of a circular area.
 *
 * Each particle is generated next to each other, so that when particles are regularly generated they move around the circle.
 */
export class CircleExteriorGenerator extends ParticleGenerator {
    /**
     * Center location of the circle.
     */
    center: Position = { x: 0, y: 0 };
    /**
     * Radius of the circle as pixels.
     */
    radius = 50;
    /**
     * The angle at which the next particle will be generated at.
     *
     * Unit is in _radians_.
     */
    nextParticleAngle = 0;
    /**
     * The angle that is incremented between each generated particle.
     *
     * Unit is in _radians_.
     */
    angleStep = 0.5;

    generateParticle(): void {
        const particle = new Particle();
        particle.position.x = this.center.x + Math.cos(this.nextParticleAngle) * this.radius;
        particle.position.y = this.center.y + Math.sin(this.nextParticleAngle) * this.radius;
        this.nextParticleAngle += this.angleStep;

        this.parentSystem.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: CircleExteriorGenerator.moduleTypeId,
            center: this.center,
            radius: this.radius,
            nextParticleAngle: this.nextParticleAngle,
            angleStep: this.angleStep,
        };
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): CircleExteriorGenerator {
        const module = new CircleExteriorGenerator(particleSystem);
        loadSerializedProperty(object, CircleExteriorGenerator, module, "center", deserializePrimitiveDataType);
        loadSerializedProperty(object, CircleExteriorGenerator, module, "radius", deserializePrimitiveDataType);
        loadSerializedProperty(
            object,
            CircleExteriorGenerator,
            module,
            "nextParticleAngle",
            deserializePrimitiveDataType,
        );
        loadSerializedProperty(object, CircleExteriorGenerator, module, "angleStep", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "CircleExteriorGenerator";
}
