import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { Color } from "../types";
import { lerpColor } from "../utilities";

/**
 * Module that assigns each particle a random color.
 *
 * Color range can be customized to some degree using `palette` property.
 *
 * It is a array of Colors. Any interpolated step between the colors in this array can be assigned to particles.
 * For example, the following configuration results in particles varying from Red to Green colors:
 *
 * ```ts
 *  const color = new RandomColor(effect)
 *  color.palette = [
 *      { r: 1, g: 0, b: 0 },
 *      { r: 0, g: 1, b: 0 }
 *  ]
 * ```
 *
 * @module
 * @category    Initializer
 * palette {
 *      @tooltip        TODO
 *      @type           Color[]
 *      @defaultValue   [{ "r": 1, "g": 0, "b": 0 }, { "r": 0, "g": 1, "b": 0 }, { "r": 0, "g": 0, "b": 1 }, { "r": 1, "g": 0, "b": 0 }]
 * }
 */
export class RandomColor extends Module {
    palette: Color[] = [
        { r: 1, g: 0, b: 0 },
        { r: 0, g: 1, b: 0 },
        { r: 0, g: 0, b: 1 },
        { r: 1, g: 0, b: 0 },
    ];

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
        this.active = false;
    }

    handleParticleAdd = (particle: Particle): void => {
        const randomPalettePosition = Math.random() * (this.palette.length - 1);
        const iPaletteStart = Math.floor(randomPalettePosition);
        const colorA = this.palette[iPaletteStart];
        const colorB = this.palette[iPaletteStart + 1];
        particle.color = lerpColor(colorA, colorB, randomPalettePosition - iPaletteStart);
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RandomColor.moduleTypeId,
            palette: this.palette,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): RandomColor {
        const module = new RandomColor(particleEffect);
        loadSerializedProperty(object, RandomColor, module, "palette", deserializePrimitiveDataType, hideWarnings);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomColor";
}
