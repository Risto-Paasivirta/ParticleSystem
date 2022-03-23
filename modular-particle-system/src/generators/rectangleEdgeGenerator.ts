import { ModuleObject } from "../module";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Position } from "../types";
import { ParticleGenerator } from "./generator";

/**
 * Generator module that creates particles along the exterior of a rectangle area.
 */
export class RectangleEdgeGenerator extends ParticleGenerator {
    /**
     * Start position of the rectangle
     */
    startPosition: Position = { x: 0, y: 0 };
    /**
     * Width of the rectangle
     */
    width = 200;
    /**
     * Height of the rectangle
     */
    height = 50;

    randomWidth = () => this.startPosition.x + Math.round(Math.random() * this.width);
    randomHeight = () => this.startPosition.y + Math.round(Math.random() * this.height);

    generateParticle(): void {
        const particle = new Particle();
        /*
			 _____1______
			|			|
		  0 |			| 2
			|_____3_____|
		*/
        const side = Math.round(Math.random() * 4);

        switch (side) {
            case 0:
                particle.position.x = this.startPosition.x;
                particle.position.y = this.randomHeight();
                break;
            case 1:
                particle.position.x = this.randomWidth();
                particle.position.y = this.startPosition.y;
                break;
            case 2:
                particle.position.x = this.startPosition.x + this.width;
                particle.position.y = this.randomHeight();
                break;
            case 3:
                particle.position.x = this.randomWidth();
                particle.position.y = this.startPosition.y + this.height;
        }

        this.particleEffect.addParticle(particle);
    }

    toObject(): ModuleObject {
        return {
            moduleTypeId: RectangleEdgeGenerator.moduleTypeId,
            interval: this.interval,
            width: this.width,
            height: this.height,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): RectangleEdgeGenerator {
        const module = new RectangleEdgeGenerator(particleEffect);
        loadSerializedProperty(object, RectangleEdgeGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, RectangleEdgeGenerator, module, "width", deserializePrimitiveDataType);
        loadSerializedProperty(object, RectangleEdgeGenerator, module, "height", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RectangleEdgeGenerator";
}
