import * as PIXI from "pixi.js";
import { ParticleSystem } from "modular-particle-system/particleSystem";
import { LifeTimeRange } from "modular-particle-system/initializers/lifeTimeRange";
import { Gravity } from "modular-particle-system/modifiers/gravity";
import { Renderer } from "./helpers/renderer/renderer";
import { RandomScale } from "modular-particle-system/initializers/randomScale";
import { PointGenerator } from "modular-particle-system/generators/pointGenerator";
import { RandomAngleVelocity } from "modular-particle-system/initializers/randomAngleVelocity";
import { RandomColor } from "modular-particle-system/initializers/randomColor";

document.body.style.margin = "0px 0px";
document.body.style.width = "100vw";
document.body.style.height = "100vh";
const loader = PIXI.Loader.shared;
loader.add("spritesheet", "./assets/kenney_particlePack.json");
loader.load();

const particleSystem = new ParticleSystem();
const renderer = new Renderer(document.body, particleSystem);

const effect = particleSystem.addParticleEffect();
effect.sprites = ["circle_05.png"];

const generator = new PointGenerator(effect);
generator.interval = 0;
generator.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
effect.modules.push(generator);

const velocity = new RandomAngleVelocity(effect);
velocity.min = 100;
velocity.max = 300;
effect.modules.push(velocity);

const initializer = new LifeTimeRange(effect);
effect.modules.push(initializer);

const gravity = new Gravity(effect);
gravity.center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
effect.modules.push(gravity);

const scale = new RandomScale(effect);
effect.modules.push(scale);
scale.min = scale.max = 0.1;

const color = new RandomColor(effect);
effect.modules.push(color);

const downGravity = new Gravity(effect);
effect.modules.push(downGravity);

const sliders = document.createElement("div");
document.body.append(sliders);
sliders.style.position = "fixed";
sliders.style.left = "0px";
sliders.style.top = "0px";
sliders.style.display = "flex";
sliders.style.flexDirection = "column";
const Slider = (
  name: string,
  min: number,
  max: number,
  defaultValue: number,
  setValue: (value: number) => unknown
) => {
  const div = document.createElement("div");
  sliders.append(div);
  div.style.display = "flex";
  const label = document.createElement("span");
  label.style.color = "white";
  label.style.width = "100px";
  label.innerHTML = name;
  div.append(label);
  const slider = document.createElement("input");
  div.append(slider);
  slider.type = "range";
  slider.min = String(min);
  slider.max = String(max);
  slider.value = String(defaultValue);
  setValue(defaultValue);
  slider.oninput = (e) =>
    setValue(Number((e.target as HTMLInputElement).value));
};
Slider("Pull strength", 0, 1000, 250, (value) => {
  gravity.strength = value;
});
Slider("Gravity", 0, 1000, 0, (value) => {
  downGravity.strength = value;
});

document.addEventListener("mousemove", (e) => {
  if (e.shiftKey || e.ctrlKey) gravity.center = { x: e.clientX, y: e.clientY };
});

loader.onComplete.once(() => {
  setTimeout(() => {
    new Array(100).fill(0).forEach((_) => generator.generateParticle());
  }, 1000);
});
loader.load();
