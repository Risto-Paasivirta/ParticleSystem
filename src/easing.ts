// Easing functions for animations
// See https://easings.net/#

/**
 * Type definition of an _Easing function_.
 *
 * @param   x   Number between [0, 1] where 0 is start of animation and 1 is end of animation.
 * @returns     Number between [0, 1] where 0 is start of animation and 1 is end of animation.
 */
export type EasingFunction = (x: number) => number;

/**
 * Collection of all implemented _Easing functions_.
 */
export const EasingFunctions = {
    /**
     * https://easings.net/#easeOutSine
     */
    easeOutSine: ((x: number) => {
        return Math.sin((x * Math.PI) / 2);
    }) as EasingFunction,
};
