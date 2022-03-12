console.log("hello world");

import { ParticleSystem } from "modular-particle-system/particleSystem";

// NOTE: Effects and modules can also be initialized by using their constructors.
// However, currently the easiest way to create a particle effect is to load from JSON object.
// The Cheatsheet found in GitHub is a great asset for this.

const particleSystem = ParticleSystem.fromObject({
  effects: [
    {
      modules: [
        {
          moduleTypeId: "PointGenerator",
          position: { x: 100, y: 100 },
          interval: 1,
        },
        {
          moduleTypeId: "RandomColor",
        },
      ],
    },
  ],
});

console.log(particleSystem);

setInterval(() => {
  particleSystem.update(0.1);
}, 100);
